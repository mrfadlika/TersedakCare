import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for browser-side usage (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side API routes (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Database types for TypeScript
export interface User {
    id: number;
    email: string;
    name: string;
    password_hash: string;
    avatar_url?: string | null;
    created_at: string;
    updated_at: string;
}

export interface LearningProgress {
    id: number;
    user_id: number;
    module_id: string;
    lesson_id: string;
    completed_at: string;
}

export interface QuizResult {
    id: number;
    user_id: number;
    module_id: string;
    lesson_id: string;
    score: number;
    total_questions: number;
    answers: object | null;
    completed_at: string;
}

export interface Bookmark {
    id: number;
    user_id: number;
    item_id: string;
    item_title: string;
    item_category: string | null;
    item_path: string;
    created_at: string;
}
