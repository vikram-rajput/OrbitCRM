import type React from "react";
import { Megaphone, SquareTerminal, CalendarDays, ChevronRight, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function CreateProjectEmptyState() {
  return (
    <div className="flex h-[calc(100vh-var(--header-height)-3rem)] flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <header className="space-y-2">
          <h2 className="text-2xl font-bold">Create your first project</h2>
          <p className="text-muted-foreground">
            Start by selecting a template or begin with a blank canvas.
          </p>
        </header>

        <div className="mt-8 space-y-4">
          <TemplateCard
            icon={<Megaphone className="h-6 w-6 text-white" />}
            iconBgColor="bg-pink-500"
            title="Marketing Campaign"
            description="Plan and launch engaging campaigns to reach your audience."
          />
          <TemplateCard
            icon={<SquareTerminal className="h-6 w-6 text-white" />}
            iconBgColor="bg-purple-500"
            title="Engineering Project"
            description="Manage complex builds and bring your technical ideas to life."
          />
          <TemplateCard
            icon={<CalendarDays className="h-6 w-6 text-white" />}
            iconBgColor="bg-orange-500"
            title="Event"
            description="Organize and track events that matter — from meetups to conferences."
          />
        </div>

        <div className="mt-8">
          <Link
            href="#"
            className="text-primary inline-flex items-center text-sm font-medium hover:underline">
            or start from an empty project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

interface TemplateCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
}

function TemplateCard({ icon, iconBgColor, title, description }: TemplateCardProps) {
  return (
    <Card className="hover:bg-muted flex cursor-pointer flex-row items-center gap-4 p-4">
      <div className={`flex-shrink-0 rounded-full p-3 ${iconBgColor}`}>{icon}</div>
      <div className="flex-grow text-left">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <ChevronRight className="text-muted-foreground ml-auto size-4 shrink-0" />
    </Card>
  );
}
