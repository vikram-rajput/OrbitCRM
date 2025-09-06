
import GetStartedForm from "@/components/layout/forms/get-started/get-started-form";
import Link from "next/link";

export const metadata = {
  title: ``,
  description: ""
};

export default function GetStarted() {
  return (
    <main className="xs:m-10 m-auto flex min-h-screen flex-col items-center justify-between">

      <div className="container mx-auto px-4 py-12 sm:px-0">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl leading-snug font-semibold sm:text-4xl md:mt-10">
              Discover why New Gen brands are brought to market with Brand IQ solutions
            </h2>
            <p className="mt-6 text-lg sm:text-xl">
              Want to boost profits, control costs and outsmart competitors? See how others are
              succeeding with us.
            </p>
            <ul className="mt-6 list-inside list-disc space-y-2 text-base sm:text-lg">
              <li>Speed up your go-to-market</li>
              <li>Centralize and secure data</li>
              <li>Manage vendor, production, sourcing in one place</li>
              <li>
                Getting started with Brand IQ is easy <Link href="/onboarding">Get Started</Link>
              </li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="w-full items-end md:w-1/2">
            <GetStartedForm />
          </div>
        </div>
      </div>


    </main>
  );
}
