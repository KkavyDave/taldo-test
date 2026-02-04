import { NextRequest, NextResponse } from 'next/server';
import { getUserSession, createUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// Get all users (admin only)
export async function GET() {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

// Create new user (admin only)
export async function POST(request: NextRequest) {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { email, name, password, role } = await request.json();

        if (!email || !name || !password) {
            return NextResponse.json(
                { error: 'Email, name, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters long' },
                { status: 400 }
            );
        }

        const result = await createUser({ email, name, password, role });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Failed to create user' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            userId: result.userId,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Create user error:', error);
        return NextResponse.json(
            { error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
