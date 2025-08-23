import * as React from "react";

import { ArrowUpIcon } from "lucide-react";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export function IncomeCard() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardDescription>Total Income</CardDescription>
        <div className="font-display text-2xl lg:text-3xl">$78,000</div>
        <div className="flex items-center text-xs">
          <ArrowUpIcon className="mr-1 size-3 text-green-500" />
          <span className="font-medium text-green-500">2.5%</span>
          <span className="text-muted-foreground ml-1">Compare from last month</span>
        </div>
      </CardHeader>
    </Card>
  );
}
