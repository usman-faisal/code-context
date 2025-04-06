// src/app/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'; // Default redirect to home page

  console.log('Auth Callback: Received code:', code); // Debug log

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // The setAll method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      console.log('Auth Callback: Session exchanged successfully. Redirecting to:', next); // Debug log
      return NextResponse.redirect(`${origin}${next}/dashboard`);
    } else {
        console.error('Auth Callback: Error exchanging code for session:', error); // Debug log
    }
  } else {
    console.warn('Auth Callback: No code found in URL.'); // Debug log
  }

  // return the user to an error page with instructions
  console.error('Auth Callback: Redirecting to auth error page.'); // Debug log
  return NextResponse.redirect(`${origin}/auth/auth-code-error`); // Or redirect to /error or /login
}