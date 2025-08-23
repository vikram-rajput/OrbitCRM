import ResetPasswordClientPage from "@/components/layout/forms/reset-password/reset-password-form";
import { generateMeta } from "@/lib/utils";


export async function generateMetadata() {
  return generateMeta({
    title: "Reset Password Page",
    description: "This is the reset password page for the application.",
    canonical: "/reset-password",
  });
}

export default function ResetPasswordPage() {
  return <ResetPasswordClientPage />;
}
