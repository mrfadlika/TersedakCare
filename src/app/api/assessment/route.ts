import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tersedakcare-secret-key-2024';

// GET - Get user's assessment results
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const type = request.nextUrl.searchParams.get('type'); // 'pre' or 'post'

        const { data: results } = await supabaseAdmin
            .from('quiz_results')
            .select('*')
            .eq('user_id', decoded.userId)
            .eq('module_id', type === 'pre' ? 'pretest' : 'posttest')
            .order('completed_at', { ascending: false })
            .limit(1);

        const result = results && results.length > 0 ? results[0] : null;

        return NextResponse.json({
            result: result ? {
                score: result.score,
                total: result.total_questions,
                answers: result.answers,
                completedAt: result.completed_at
            } : null
        });

    } catch (error) {
        console.error('Get assessment error:', error);
        return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }
}

// POST - Save assessment result
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const { type, score, total, answers } = await request.json();

        if (!type || score === undefined || !total) {
            return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
        }

        const moduleId = type === 'pre' ? 'pretest' : 'posttest';

        const { error } = await supabaseAdmin
            .from('quiz_results')
            .insert({
                user_id: decoded.userId,
                module_id: moduleId,
                lesson_id: moduleId,
                score: score,
                total_questions: total,
                answers: answers || null,
                completed_at: new Date().toISOString()
            });

        if (error) {
            console.error('Insert assessment error:', error);
            return NextResponse.json({ error: 'Gagal menyimpan hasil' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Hasil tersimpan', success: true });

    } catch (error) {
        console.error('Save assessment error:', error);
        return NextResponse.json({ error: 'Gagal menyimpan hasil' }, { status: 500 });
    }
}
