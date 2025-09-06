import Link from "next/link";
import { DribbbleIcon, FacebookIcon, LinkedinIcon, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/logo";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container space-y-4 pb-4 lg:pb-8">
     
      <div className="flex flex-col justify-between gap-4 sm:flex-row!">
        <div className="text-muted-foreground flex items-center justify-center gap-1 text-sm sm:justify-start">
          <span>&copy; {new Date().getFullYear()}</span>
          <span>|</span>
          <Button variant="link" className="h-auto p-0" asChild>
            <Link target="_blank" href="https://vikramrajput.com/">
              VikramRajput
            </Link>
          </Button>
          .
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href="#">
              <FacebookIcon />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href="#">
              <Twitter />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href="#">
              <DribbbleIcon />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" className="hover:opacity-50" asChild>
            <Link href="#">
              <LinkedinIcon />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};
