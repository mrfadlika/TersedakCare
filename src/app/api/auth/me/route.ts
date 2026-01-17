import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tersedakcare-secret-key-2024';

interface User {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
}

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'Tidak terautentikasi' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };

        // Get user data from Supabase
        const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('id, name, email, avatar_url')
            .eq('id', decoded.userId)
            .single<User>();

        if (error || !user) {
            return NextResponse.json(
                { error: 'User tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });

    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Token tidak valid' },
            { status: 401 }
        );
    }
}
