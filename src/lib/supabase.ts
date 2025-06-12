import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.ctzvcqjmjtgknyyablgm.supabase.co;
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0enZjcWptanRna255eWFibGdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzAzNzgsImV4cCI6MjA2MzYwNjM3OH0.uymTVbmd9OeOjjxZF_NcXcNhpUhUVPKjfsxEF3Pg5fw;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);