import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database'

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client with type safety
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Helper functions for common operations
export const auth = supabase.auth

// Database helpers
export const db = {
  // Baon Mode operations
  baon: {
    create: (data: any) => supabase.from('baon_entries').insert(data),
    getAll: (userId: string) => supabase.from('baon_entries').select('*').eq('user_id', userId),
    getByDate: (userId: string, date: string) => 
      supabase.from('baon_entries').select('*').eq('user_id', userId).eq('date', date),
    update: (id: string, data: any) => supabase.from('baon_entries').update(data).eq('id', id),
    delete: (id: string) => supabase.from('baon_entries').delete().eq('id', id),
  },
  
  // Utang Tracker operations
  utang: {
    create: (data: any) => supabase.from('utang_entries').insert(data),
    getAll: (userId: string) => supabase.from('utang_entries').select('*').eq('user_id', userId),
    getByType: (userId: string, type: 'utang_ko' | 'utang_nila') => 
      supabase.from('utang_entries').select('*').eq('user_id', userId).eq('type', type),
    update: (id: string, data: any) => supabase.from('utang_entries').update(data).eq('id', id),
    delete: (id: string) => supabase.from('utang_entries').delete().eq('id', id),
    markAsPaid: (id: string) => supabase.from('utang_entries').update({ status: 'paid' }).eq('id', id),
  },
  
  // Expense tracking operations
  expenses: {
    create: (data: any) => supabase.from('expense_entries').insert(data),
    getAll: (userId: string) => supabase.from('expense_entries').select('*').eq('user_id', userId),
    getByCategory: (userId: string, category: string) => 
      supabase.from('expense_entries').select('*').eq('user_id', userId).eq('category', category),
    getByDateRange: (userId: string, startDate: string, endDate: string) => 
      supabase.from('expense_entries').select('*').eq('user_id', userId)
        .gte('date', startDate).lte('date', endDate),
    update: (id: string, data: any) => supabase.from('expense_entries').update(data).eq('id', id),
    delete: (id: string) => supabase.from('expense_entries').delete().eq('id', id),
  },
  
  // User profile operations
  profile: {
    get: (userId: string) => supabase.from('profiles').select('*').eq('id', userId).single(),
    update: (userId: string, data: any) => supabase.from('profiles').update(data).eq('id', userId),
    create: (data: any) => supabase.from('profiles').insert(data),
  },
  
  // Family wallet operations
  familyWallet: {
    create: (data: any) => supabase.from('family_wallets').insert(data),
    getAll: (userId: string) => supabase.from('family_wallets').select(`
      *,
      family_wallet_members!inner(*)
    `).eq('family_wallet_members.user_id', userId),
    addMember: (walletId: string, userId: string, role = 'member') => 
      supabase.from('family_wallet_members').insert({ wallet_id: walletId, user_id: userId, role }),
    removeMember: (walletId: string, userId: string) => 
      supabase.from('family_wallet_members').delete().eq('wallet_id', walletId).eq('user_id', userId),
  }
}

// Auth helper functions
export const authHelpers = {
  signUp: async (email: string, password: string, fullName: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    })
  },
  
  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  },
  
  signOut: async () => {
    return await supabase.auth.signOut()
  },
  
  resetPassword: async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email)
  },
  
  getCurrentUser: () => {
    return supabase.auth.getUser()
  }
}
