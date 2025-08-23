import { Card, CardAction, CardDescription, CardHeader } from "@/components/ui/card";
import CountAnimation from "@/components/ui/custom/count-animation";
import { Badge } from "@/components/ui/badge";

export default function SuccessfulConversionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Successful conversions</CardDescription>
        <CardAction>
          <Badge variant="success">+10.3%</Badge>
        </CardAction>
        <div className="font-display text-3xl">
          <CountAnimation number={1204} />
        </div>
        <div className="text-muted-foreground text-sm">Less than last month</div>
      </CardHeader>
    </Card>
  );
}
