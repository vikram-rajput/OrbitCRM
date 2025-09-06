import ForgotPasswordClientPage from "@/components/layout/forms/forgot-password/forgot-password-form";
import { generateMeta } from "@/lib/common/utils";



export async function generateMetadata() {
  return generateMeta({
    title: "Forgot Password Page",
    description: "This is the forgot password page for the application.",
    canonical: "/forgot-password",
  });
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordClientPage />;
}
