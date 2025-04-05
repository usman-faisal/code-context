import { Database } from '@/lib/types/database.types'
import { createBrowserClient } from '@supabase/ssr'

export function createClient(): ReturnType<typeof createBrowserClient<Database>> { 
    return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!) 
}