"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/common/utils";
import { ChevronRightIcon, Menu } from "lucide-react";

import { productList, routeList } from "@/@data/navbar";

import Icon from "@/components/icon";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import Logo from "@/components/layout/landing/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleTheme } from "@/components/layout/landing/toogle-theme";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-2 z-40 lg:top-5">
      <div className="container">
        <div className="bg-background/70 flex items-center justify-between rounded-2xl border p-3 backdrop-blur-sm">
          <Logo />
          {/* <!-- Mobile --> */}
          <div className="flex items-center lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Menu onClick={() => setIsOpen(!isOpen)} className="cursor-pointer lg:hidden" />
              </SheetTrigger>

              <SheetContent
                side="left"
                className="bg-card border-secondary flex flex-col justify-between rounded-tr-2xl rounded-br-2xl">
                <div>
                  <SheetHeader className="mb-4 ml-4">
                    <SheetTitle className="flex items-center">
                      <Logo />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex flex-col gap-2">
                    {routeList.map(({ href, label }) => (
                      <Button
                        key={href}
                        onClick={() => setIsOpen(false)}
                        asChild
                        variant="ghost"
                        className="justify-start text-base">
                        <Link href={href}>{label}</Link>
                      </Button>
                    ))}
                  </div>
                </div>

                <SheetFooter className="flex-col items-start justify-start sm:flex-col">
                  <Separator className="mb-2" />
                  <ToggleTheme />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          {/* <!-- Desktop --> */}
          <NavigationMenu className="mx-auto hidden lg:block">
            <NavigationMenuList className="space-x-0">
        

              <NavigationMenuItem>
                {routeList.map(({ href, label }) => (
                  <NavigationMenuLink
                    key={href}
                    asChild
                    className={cn(navigationMenuTriggerStyle(), "hover:bg-muted! bg-transparent!")}>
                    <Link href={href}>{label}</Link>
                  </NavigationMenuLink>
                ))}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center lg:flex">
            <ToggleTheme />

            <div className="flex gap-2">
            
                <Link href="/login">
                  Log in
                </Link>

                <Link href="/register">Get Started
                </Link>

            
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
