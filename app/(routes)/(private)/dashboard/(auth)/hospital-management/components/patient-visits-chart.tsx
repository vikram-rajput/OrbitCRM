"use client";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const chartData = [
  { month: "January", famale: 186, male: 140, child: 150 },
  { month: "February", famale: 305, male: 230, child: 176 },
  { month: "March", famale: 237, male: 120, child: 190 },
  { month: "April", famale: 173, male: 190, child: 170 },
  { month: "May", famale: 209, male: 130, child: 129 },
  { month: "June", famale: 214, male: 90, child: 180 }
];
const chartConfig = {
  famale: {
    label: "Female",
    color: "var(--chart-1)"
  },
  male: {
    label: "Male",
    color: "var(--chart-2)"
  },
  child: {
    label: "Child",
    color: "var(--chart-2)"
  }
} satisfies ChartConfig;

export function PatientVisitsChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Patient Visits by Gender</CardTitle>
        <CardAction>
          <Select defaultValue="2025">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full lg:h-[400px]" config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 6,
              right: 6
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={35}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="famale" type="natural" stroke="var(--color-famale)" strokeWidth={2} />
            <Line dataKey="male" type="natural" stroke="var(--color-male)" strokeWidth={2} />
            <Line dataKey="child" type="natural" stroke="var(--color-child)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
