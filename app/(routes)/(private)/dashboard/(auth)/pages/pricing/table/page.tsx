"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [isYearly, setIsYearly] = useState(false);

  const pricingTiers = [
    {
      name: "Basic",
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: {
        users: "1 user",
        storage: "5GB storage",
        support: "Basic support",
        integrations: "Limited integrations",
        analytics: false,
        api: false
      }
    },
    {
      name: "Pro",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: {
        users: "5 users",
        storage: "50GB storage",
        support: "Priority support",
        integrations: "Advanced integrations",
        analytics: true,
        api: false
      }
    },
    {
      name: "Enterprise",
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      features: {
        users: "Unlimited users",
        storage: "500GB storage",
        support: "24/7 premium support",
        integrations: "Custom integrations",
        analytics: true,
        api: true
      }
    }
  ];

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number) => {
    const yearlyCost = monthlyPrice * 12;
    const savings = yearlyCost - yearlyPrice;
    const savingsPercentage = (savings / yearlyCost) * 100;
    return savingsPercentage.toFixed(0);
  };

  return (
    <div className="mx-auto max-w-(--breakpoint-lg) lg:py-16">
      <div className="mb-6 flex flex-col items-start justify-between space-y-2 lg:flex-row lg:items-center">
        <h1 className="text-2xl font-bold tracking-tight lg:text-3xl">Choose Your Plan</h1>
        <div className="flex items-start justify-center space-x-4 lg:items-center">
          <span className={`text-sm ${!isYearly ? "font-bold" : ""}`}>Monthly</span>
          <Switch
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label="Toggle yearly pricing"
          />
          <span className={`text-sm ${isYearly ? "font-bold" : ""}`}>Yearly</span>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Features</TableHead>
                  {pricingTiers.map((tier, index) => (
                    <TableHead key={index} className="text-center">
                      {tier.name}
                      {isYearly && (
                        <Badge variant="success" className="absolute ms-2">
                          Save {calculateYearlySavings(tier.monthlyPrice, tier.yearlyPrice)}%
                        </Badge>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  {pricingTiers.map((tier, index) => (
                    <TableCell key={index} className="text-center">
                      <div className="font-display text-2xl">
                        {isYearly ? formatPrice(tier.yearlyPrice) : formatPrice(tier.monthlyPrice)}
                        <span className="text-sm font-normal">/{isYearly ? "year" : "month"}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                {(
                  Object.keys(pricingTiers[0].features) as Array<
                    keyof (typeof pricingTiers)[0]["features"]
                  >
                ).map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium capitalize">{feature}</TableCell>
                    {pricingTiers.map((tier, index) => (
                      <TableCell key={index} className="text-center">
                        {typeof tier.features[feature] === "boolean" ? (
                          tier.features[feature] ? (
                            <Check className="mx-auto text-green-500" />
                          ) : (
                            <X className="mx-auto text-red-500" />
                          )
                        ) : (
                          tier.features[feature]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  {pricingTiers.map((tier, index) => (
                    <TableCell key={index} className="text-center">
                      <Button>Choose {tier.name}</Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="my-6 lg:my-12">
        <h2 className="mb-4 text-xl font-semibold">Why Choose Our Platform?</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="lg:text-xl">Comprehensive Library</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Access thousands of courses across various disciplines
              </p>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="lg:text-xl">Expert Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn from industry professionals and thought leaders
              </p>
            </CardContent>
          </Card>
          <Card className="gap-2">
            <CardHeader>
              <CardTitle className="lg:text-xl">Flexible Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Study at your own pace, anytime and anywhere</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
