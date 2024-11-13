import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getUserRole() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth error:", error.message);
    return null;
  }

  if (!user) {
    console.warn("No user found");
    return null;
  }

  // Fetch user role from your users table
  const { data: userProfile, error: profileError } = await supabase
    .from("user_roles")
    .select("id");

  if (profileError) {
    console.error("Profile error:", profileError.message);
    return null;
  }

  // Add null check for userProfile
  if (!userProfile) {
    console.warn("No user role found");
    return null;
  }

  return userProfile[0].id;
}
