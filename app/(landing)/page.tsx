import HeroSection from "@/app/(landing)/components/hero-section";
import { HeroHeader } from "@/app/(landing)/components/hero5-header";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <HeroHeader isLoggedIn={!!user} />
      <HeroSection />
    </>
  );
}
  