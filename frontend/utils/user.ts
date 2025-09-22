import { redirect } from "next/navigation";
import { supabase } from "./supabaseClientConfig";
import useUserStore from "@/store/userUserStore";

// Login user with email and password
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Logout user
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  // Optionally clear localStorage or state here
  localStorage.removeItem("contentRepurpose");
  redirect("/auth/sign-up");
}

// Get current user details
export async function getUserDetails() {
  const contentRepurpose = localStorage.getItem("contentRepurpose");
  if (!contentRepurpose) return;

  const token = JSON.parse(contentRepurpose).token;

  if (!token) throw new Error("No JWT found in localStorage");

  const { data, error } = await supabase.auth.getUser(token);

  if (error) throw error;
  return data.user;
}

export async function authorizationChecker(currentPath: string) {
  const contentRepurpose = localStorage.getItem("contentRepurpose");
  if (!contentRepurpose) return;

  const token = JSON.parse(contentRepurpose).token;

  if (!token) {
    redirect("/auth/login");
    // throw new Error("No JWT found in localStorage");
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      window.location.href = `/auth/sign-up?to=${
        encodeURIComponent(currentPath) || `/`
      }`;
    }
    useUserStore.getState().getMe();
  } catch (error) {
    if (!token) {
      window.location.href = `/auth/sign-up?to=${
        encodeURIComponent(currentPath) || `/auth/sign-up`
      }`;
    }
  }

  return true;
}
