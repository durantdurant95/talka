"use server";

import { encodedRedirect } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData): Promise<void> => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const headersList = await headers();
  const supabase = createClient();
  const origin = headersList.get("origin");

  if (!email || !password) {
    encodedRedirect("error", "/sign-up", "Email and password are required");
    return;
  }

  const { error } = await (
    await supabase
  ).auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    encodedRedirect("error", "/sign-up", error.message);
  } else {
    encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();

  const { error } = await (
    await supabase
  ).auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    encodedRedirect("error", "/sign-in", error.message);
  }

  redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const headersList = await headers();
  const origin = headersList.get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await (
    await supabase
  ).auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    encodedRedirect("error", "/forgot-password", "Could not reset password");
  }

  if (callbackUrl) {
    redirect(callbackUrl);
  }

  encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  const { error } = await (
    await supabase
  ).auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await (await supabase).auth.signOut();
  redirect("/sign-in");
};
