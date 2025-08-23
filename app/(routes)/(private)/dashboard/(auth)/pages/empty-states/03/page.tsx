import Image from "next/image";
import { generateMeta } from "@/lib/utils";
import type React from "react";

export async function generateMetadata() {
  return generateMeta({
    title: "Empty States 03",
    description:
      "Empty states show placeholder content when no data is available. Built with shadcn/ui, Tailwind CSS, Next.js and React.",
    canonical: "/empty-states/03"
  });
}

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-3rem)] flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <figure className="mb-10">
          <Image
            src="/403.svg"
            width={300}
            height={200}
            className="mx-auto"
            unoptimized
            alt="..."
          />
        </figure>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Access to this page is blocked!</h2>
          <p className="text-muted-foreground">
            Please try another way or make sure you have the necessary permissions.
          </p>
        </div>
      </div>
    </div>
  );
}
