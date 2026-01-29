"use server";
import { auth } from "@/lib/better-auth/auth";
import { inngest } from "../Inngest/client";
import { success } from "better-auth";
import { error } from "console";
import { headers } from "next/headers";

export const signUpwithEmail = async (data: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email: data.email, password: data.password, name: data.fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email: data.email,
          name: data.fullName,
          country: data.country,
          investmentGoals: data.investmentGoals,
          riskTolerance: data.riskTolerance,
          preferredIndustry: data.preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("Sign up failed", e);
    return { success: false, error: "Sign Up failed" };
  }
};

export const SignOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (e) {
    console.log("Sign Out Failed", e);

    return { success: false, error: "Sign Out Failed" };
  }
};

export const signInwithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({ body: { email, password } });
    return { success: true, data: response };
  } catch (e) {
    console.log("Sign In failed", e);
    return { success: false, error: "Sign In failed" };
  }
};
