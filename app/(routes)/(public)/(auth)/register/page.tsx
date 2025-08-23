import { generateMeta } from "@/lib/utils";

import SignupClientPage from "@/components/layout/forms/signup/signup-form";

export async function generateMetadata() {
  return generateMeta({
    title: "Signup Page",
    description: "This is the signup page for the application.",
    canonical: "/signup",
  });
}

export default function SignupPage() {
  return <SignupClientPage />;
}
