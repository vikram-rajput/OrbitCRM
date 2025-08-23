import ForgotPasswordEmail from "@/components/layout/email/reset-password";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY! as string);

export const auth = betterAuth({
    emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({user, url}, request) => {
      await resend.emails.send({
        from: "admin@thoughtsbee.in",
        to: user.email,
        subject: "Reset your password",
        react: ForgotPasswordEmail({userName: user.name, userEmail: user.email, resetUrl: url }),
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  }, 
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
      schema
    }),
     plugins: [nextCookies()] 
});