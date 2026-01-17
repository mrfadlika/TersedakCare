import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tersedakcare-secret-key-2024';

// Get user's bookmarks
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

        const { data: bookmarks, error } = await supabaseAdmin
            .from('bookmarks')
            .select('item_id, item_title, item_category, item_path, created_at')
            .eq('user_id', decoded.userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Get bookmarks error:', error);
            return NextResponse.json({ error: 'Gagal mengambil bookmarks' }, { status: 500 });
        }

        return NextResponse.json({ bookmarks: bookmarks || [] });

    } catch (error) {
        console.error('Get bookmarks error:', error);
        return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }
}

// Add bookmark
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const { id, title, category, path } = await request.json();

        if (!id || !title || !path) {
            return NextResponse.json({ error: 'Data bookmark tidak lengkap' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('bookmarks')
            .upsert({
                user_id: decoded.userId,
                item_id: id,
                item_title: title,
                item_category: category || null,
                item_path: path,
                created_at: new Date().toISOString()
            }, { onConflict: 'user_id,item_id' });

        if (error) {
            console.error('Add bookmark error:', error);
            return NextResponse.json({ error: 'Gagal menyimpan bookmark' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Bookmark tersimpan' });

    } catch (error) {
        console.error('Add bookmark error:', error);
        return NextResponse.json({ error: 'Gagal menyimpan bookmark' }, { status: 500 });
    }
}

// Remove bookmark
export async function DELETE(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID bookmark harus diisi' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('bookmarks')
            .delete()
            .eq('user_id', decoded.userId)
            .eq('item_id', id);

        if (error) {
            console.error('Delete bookmark error:', error);
            return NextResponse.json({ error: 'Gagal menghapus bookmark' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Bookmark dihapus' });

    } catch (error) {
        console.error('Delete bookmark error:', error);
        return NextResponse.json({ error: 'Gagal menghapus bookmark' }, { status: 500 });
    }
}
