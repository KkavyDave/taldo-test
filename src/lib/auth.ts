/**
 * Authentication Utilities
 * 
 * Provides JWT-based authentication for the admin panel.
 * Uses bcrypt for password hashing and jose for JWT operations.
 * User credentials are stored in the database.
 * 
 * @module lib/auth
 */

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from './prisma';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-key-change-in-production'
);

export interface AdminSession {
    userId: string;
    email: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}

/**
 * Verify user credentials against database
 */
export async function verifyUserCredentials(
    email: string,
    password: string
): Promise<{ id: string; email: string; name: string; role: string } | null> {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
                active: true
            },
        });

        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
    } catch (error) {
        console.error('Error verifying credentials:', error);
        return null;
    }
}

/**
 * Create a JWT token for user session
 */
export async function createUserToken(user: {
    id: string;
    email: string;
    name: string;
    role: string;
}): Promise<string> {
    const token = await new SignJWT({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // Token expires in 7 days
        .sign(JWT_SECRET);

    return token;
}

/**
 * Verify JWT token and return session data
 */
export async function verifyUserToken(token: string): Promise<AdminSession | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as unknown as AdminSession;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

/**
 * Get current user session from cookies
 */
export async function getUserSession(): Promise<AdminSession | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (!token) {
        return null;
    }

    return verifyUserToken(token);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getUserSession();
    return session?.userId !== undefined;
}

/**
 * Set user session cookie
 */
export async function setUserSession(token: string) {
    const cookieStore = await cookies();
    cookieStore.set('admin-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

/**
 * Clear user session cookie
 */
export async function clearUserSession() {
    const cookieStore = await cookies();
    cookieStore.delete('admin-token');
}

/**
 * Change user password
 */
export async function changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return { success: false, error: 'User not found' };
        }

        const isValid = await bcrypt.compare(currentPassword, user.password);

        if (!isValid) {
            return { success: false, error: 'Current password is incorrect' };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return { success: true };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, error: 'Failed to change password' };
    }
}

/**
 * Update user profile details
 */
export async function updateUserProfile(
    userId: string,
    data: { name?: string }
): Promise<{ success: boolean; error?: string }> {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.name && { name: data.name }),
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Failed to update profile' };
    }
}

/**
 * Create a new user (admin only)
 */
export async function createUser(data: {
    email: string;
    name: string;
    password: string;
    role?: string;
}): Promise<{ success: boolean; error?: string; userId?: string }> {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return { success: false, error: 'Email already exists' };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                password: hashedPassword,
                role: data.role || 'admin',
            },
        });

        return { success: true, userId: user.id };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Failed to create user' };
    }
}
