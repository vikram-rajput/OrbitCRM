import Image from "next/image";
import { CheckIcon, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export const HeroSection = () => {
  return (
    <section className="container w-full">
      <div className="mx-auto grid place-items-center py-16 pb-8 md:py-32 md:pb-14 lg:max-w-(--breakpoint-xl)">
      
          <div className="space-y-8 pb-8 text-center lg:pb-20">
           
            <div className="mx-auto max-w-(--breakpoint-md) text-center text-4xl font-bold md:text-6xl">
              <h1>Elevate Your Brand with Smart CRM Solutions</h1>
            </div>
            <p className="text-muted-foreground mx-auto max-w-(--breakpoint-sm) text-l">
              {`Transform your customer relationships and marketing campaigns with our AI-powered platform designed for small businesses and startups.`}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 md:flex-row!">
              <Button className="h-12 px-10 text-base">
                Start Free Trial
                <ChevronRight />
              </Button>
              <Button variant="outline" className="h-12 px-10 text-base">
                Book a Demo
              </Button>
            </div>
            <div className="text-muted-foreground mt-6 flex flex-col items-center justify-center gap-4 text-sm md:flex-row!">
              <div className="flex items-center gap-1">
                <CheckIcon className="text-primary size-4" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckIcon className="text-primary size-4" />
                <span>14-day trial</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckIcon className="text-primary size-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        

       
      </div>
    </section>
  );
};
