"use server";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {
        success: true,
        message: "Login successful",
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message,
    };
  }
};

export const signUp = async (email: string, password: string, name: string) => {
    try{
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
        });
        return {
        success: true,
        message: "Sign up successful",
    };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            message: e.message,
        };
    }
}

export const signOut = async () => {
  try {
    await auth.api.signOut({
      headers: await headers()
    });
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "An unknown error occurred" };
  }
};