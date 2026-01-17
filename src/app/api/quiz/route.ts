import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tersedakcare-secret-key-2024';

// Get user's quiz results
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const moduleId = request.nextUrl.searchParams.get('moduleId');

        let query = supabaseAdmin
            .from('quiz_results')
            .select('module_id, lesson_id, score, total_questions, completed_at')
            .eq('user_id', decoded.userId)
            .order('completed_at', { ascending: false });

        if (moduleId) {
            query = query.eq('module_id', moduleId);
        }

        const { data: results, error } = await query;

        if (error) {
            console.error('Get quiz results error:', error);
            return NextResponse.json({ error: 'Gagal mengambil hasil quiz' }, { status: 500 });
        }

        return NextResponse.json({ results: results || [] });

    } catch (error) {
        console.error('Get quiz results error:', error);
        return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }
}

// Save quiz result
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const { moduleId, lessonId, score, totalQuestions, answers } = await request.json();

        if (!moduleId || !lessonId || score === undefined || !totalQuestions) {
            return NextResponse.json({ error: 'Data quiz tidak lengkap' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('quiz_results')
            .insert({
                user_id: decoded.userId,
                module_id: moduleId,
                lesson_id: lessonId,
                score: score,
                total_questions: totalQuestions,
                answers: answers || null,
                completed_at: new Date().toISOString()
            });

        if (error) {
            console.error('Save quiz error:', error);
            return NextResponse.json({ error: 'Gagal menyimpan hasil quiz' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Hasil quiz tersimpan' });

    } catch (error) {
        console.error('Save quiz error:', error);
        return NextResponse.json({ error: 'Gagal menyimpan hasil quiz' }, { status: 500 });
    }
}
