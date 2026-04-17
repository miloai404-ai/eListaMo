import { createClient } from '@supabase/supabase-js'
import { Database } from './types/database'

// These will need to be set from environment variables
// For now, they're placeholders for the setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

// Create Supabase client with type safety
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = supabase.auth

// Database helpers
export const db = {
  // Baon Mode operations
  baon: {
    create: (data: any) => supabase.from('baon_entries').insert(data),
    getAll: () => supabase.from('baon_entries').select('*'),
    getByDate: (date: string) => supabase.from('baon_entries').select('*').eq('date', date),
  },
  
  // Utang Tracker operations
  utang: {
    create: (data: any) => supabase.from('utang_entries').insert(data),
    getAll: () => supabase.from('utang_entries').select('*'),
    update: (id: string, data: any) => supabase.from('utang_entries').update(data).eq('id', id),
    delete: (id: string) => supabase.from('utang_entries').delete().eq('id', id),
  },
  
  // User profile operations
  profile: {
    get: (userId: string) => supabase.from('profiles').select('*').eq('user_id', userId).single(),
    update: (userId: string, data: any) => supabase.from('profiles').update(data).eq('user_id', userId),
  }
}