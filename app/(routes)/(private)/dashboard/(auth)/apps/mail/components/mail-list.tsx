import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";
import { Mail } from "../data";
import { useMailStore } from "../use-mail";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const { selectedMail, setSelectedMail } = useMailStore();

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "hover:bg-accent/70 flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all",
              selectedMail?.id === item.id && "bg-accent/70"
            )}
            onClick={() => setSelectedMail(item)}>
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && <span className="flex h-2 w-2 rounded-full bg-blue-600" />}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selectedMail?.id === item.id ? "text-foreground" : "text-muted-foreground"
                  )}>
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="text-muted-foreground line-clamp-2 text-xs">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(label: string): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
