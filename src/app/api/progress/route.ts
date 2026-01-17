import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

const JWT_SECRET = process.env.JWT_SECRET || 'tersedakcare-secret-key-2024';

// Get user's learning progress
export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const moduleId = request.nextUrl.searchParams.get('moduleId');

        // Get learning progress
        let query = supabaseAdmin
            .from('learning_progress')
            .select('module_id, lesson_id, completed_at')
            .eq('user_id', decoded.userId);

        if (moduleId) {
            query = query.eq('module_id', moduleId);
        }

        const { data: progress } = await query;

        // Get completed modules
        const { data: completedModules } = await supabaseAdmin
            .from('completed_modules')
            .select('module_order, completed_at')
            .eq('user_id', decoded.userId);

        return NextResponse.json({
            lessons: progress || [],
            completedModules: (completedModules || []).map(m => m.module_order)
        });

    } catch (error) {
        console.error('Get progress error:', error);
        return NextResponse.json({ error: 'Token tidak valid' }, { status: 401 });
    }
}

// Save lesson completion
export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth_token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        const { moduleId, lessonId, moduleOrder, type } = await request.json();

        if (type === 'lesson' && moduleId && lessonId) {
            // Save lesson completion
            const { error } = await supabaseAdmin
                .from('learning_progress')
                .upsert({
                    user_id: decoded.userId,
                    module_id: moduleId,
                    lesson_id: lessonId,
                    completed_at: new Date().toISOString()
                }, { onConflict: 'user_id,module_id,lesson_id' });

            if (error) {
                console.error('Insert lesson error:', error);
            }
        }

        if (type === 'module' && moduleOrder !== undefined) {
            // Save module completion
            const { error } = await supabaseAdmin
                .from('completed_modules')
                .upsert({
                    user_id: decoded.userId,
                    module_order: moduleOrder,
                    completed_at: new Date().toISOString()
                }, { onConflict: 'user_id,module_order' });

            if (error) {
                console.error('Insert module error:', error);
            }
        }

        // Legacy support: if no type, use old format
        if (!type && moduleId && lessonId) {
            await supabaseAdmin
                .from('learning_progress')
                .upsert({
                    user_id: decoded.userId,
                    module_id: moduleId,
                    lesson_id: lessonId,
                    completed_at: new Date().toISOString()
                }, { onConflict: 'user_id,module_id,lesson_id' });
        }

        return NextResponse.json({ message: 'Progress tersimpan' });

    } catch (error) {
        console.error('Save progress error:', error);
        return NextResponse.json({ error: 'Gagal menyimpan progress' }, { status: 500 });
    }
}
