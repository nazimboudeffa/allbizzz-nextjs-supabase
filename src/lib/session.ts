import { supabase } from '@/config/supabase'

export async function getCurrentSession() {
    const { data, error } = await supabase.auth.getSession()

    return { data, error }
}

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()

    return { user }
}