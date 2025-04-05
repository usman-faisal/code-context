import SignOutButton from "@/components/signout-button";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if(!user) {
    return <div>Please login</div>
  }
  return (
    <div>
      <h1>Hello {user?.email}</h1>
      <SignOutButton />
    </div>
  );
}
  