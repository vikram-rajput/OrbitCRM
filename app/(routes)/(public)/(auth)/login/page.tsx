import { generateMeta } from "@/lib/utils";

import SigninClientPage from "@/components/layout/forms/signin/signin-form";

export async function generateMetadata() {
  return generateMeta({
    title: "Login Page",
    description:
      "This is the login page for the application.",
    canonical: "/login"
  });
}

export default function LoginPage() {
  return (
    <SigninClientPage />
  );
}
