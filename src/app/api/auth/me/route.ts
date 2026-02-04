import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        // Fetch fresh user data from database
        const user = await prisma.user.findUnique({
            where: { id: session.userId },
            select: { id: true, email: true, name: true, role: true },
        });

        if (!user) {
            return NextResponse.json(
                { authenticated: false },
                { status: 401 }
            );
        }

        return NextResponse.json({
            authenticated: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json(
            { authenticated: false },
            { status: 500 }
        );
    }
}
