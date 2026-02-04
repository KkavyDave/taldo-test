import { NextRequest, NextResponse } from 'next/server';
import { getUserSession, updateUserProfile } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await getUserSession();

        if (!session) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name } = await request.json();

        if (!name) {
            return NextResponse.json(
                { error: 'Name is required' },
                { status: 400 }
            );
        }

        const result = await updateUserProfile(session.userId, { name });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Failed to update profile' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error('Update profile error:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
