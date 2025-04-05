"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // Import headers to get origin

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: `${firstName + " " + lastName}`,
        email: formData.get("email") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/logout");
}

export async function signInWithGoogle() {
    const origin = (await headers()).get("origin"); // Get the base URL
    const supabase = await createClient();
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        // IMPORTANT: This tells Supabase where to redirect the user *after*
        // the /auth/callback route has successfully exchanged the code
        // and set the session cookie.
        redirectTo: `${origin}/auth/callback`, // Ensure this matches your callback route location
      },
    });
  
    console.log('signInWithGoogle data:', data); // Debug log
    console.error('signInWithGoogle error:', error); // Debug log
  
    if (error) {
      console.error("Google Sign-In Error:", error);
      // Redirect to an error page or login page with an error message
      return redirect("/login?message=Could not authenticate user");
    }
  
    // The redirect function from next/navigation is used to send the user
    // to the provider's authentication page.
    if (data.url) {
        console.log('Redirecting user to Google:', data.url) // Debug log
        redirect(data.url);
    } else {
        console.error("Google Sign-In Error: No URL returned from Supabase");
        return redirect("/login?message=Could not get Google authentication URL");
    }
  
  }