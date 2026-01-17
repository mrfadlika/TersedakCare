import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tersedakcare-secret-key-2024';

// Complete a module
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const { moduleOrder } = await request.json();

        if (moduleOrder === undefined) {
            return NextResponse.json({ error: 'moduleOrder harus diisi' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('completed_modules')
            .upsert({
                user_id: decoded.userId,
                module_order: moduleOrder,
                completed_at: new Date().toISOString()
            }, { onConflict: 'user_id,module_order' });

        if (error) {
            console.error('Complete module error:', error);
            return NextResponse.json({ error: 'Gagal menyimpan' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Modul selesai' });

    } catch (error) {
        console.error('Complete module error:', error);
        return NextResponse.json({ error: 'Gagal menyimpan' }, { status: 500 });
    }
}
