import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  EditIcon,
  Package,
  Pencil,
  Printer,
  Truck
} from "lucide-react";
import { generateMeta } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

type OrderStatus = "processing" | "shipped" | "out-for-delivery" | "delivered";

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
}

export async function generateMetadata() {
  return generateMeta({
    title: "Order Detail Page",
    description:
      "View and track your order details quickly on this page built with shadcn/ui, Tailwind CSS, and Next.js. Access comprehensive order information at a glance.",
    canonical: "/pages/orders/detail"
  });
}

export default function Page() {
  const order: Order = {
    id: "ORD-12345",
    date: "2025-04-15",
    status: "shipped",
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com",
      address: "123 Main St, Anytown, AN 12345"
    },
    items: [
      {
        id: 1,
        name: "Wireless Headphones",
        image: "/products/01.jpeg",
        quantity: 2,
        price: 25.99
      },
      {
        id: 2,
        name: "Bluetooth Speaker",
        image: "/products/02.jpeg",
        quantity: 1,
        price: 49.99
      }
    ],
    subtotal: 101.97,
    shipping: 10.0,
    total: 111.97
  };

  const statusSteps: Record<OrderStatus, string> = {
    processing: "Processing",
    shipped: "Shipped",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered"
  };

  const currentStep = statusSteps[order.status];
  const currentStepIndex = Object.keys(statusSteps).indexOf(order.status);

  return (
    <div className="mx-auto max-w-screen-lg space-y-4 lg:mt-10">
      <div className="flex items-center justify-between">
        <Button asChild variant="outline">
          <Link href="/dashboard/pages/orders">
            <ChevronLeft />
          </Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer />
            Print
          </Button>
          <Button>
            <Pencil />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-2xl">Order {order.id}</CardTitle>
            <p className="text-muted-foreground text-sm">Placed on {order.date}</p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Customer Information</h3>
                <p className="text-muted-foreground text-sm">{order.customer.name}</p>
                <p className="text-muted-foreground text-sm">{order.customer.email}</p>
                <p className="text-muted-foreground text-sm">{order.customer.address}</p>
              </div>
              <div className="bg-muted flex items-center justify-between space-y-2 rounded-md border p-4">
                <div className="space-y-1">
                  <h4 className="font-medium">Payment Method</h4>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <CreditCard className="size-4" /> Visa ending in **** 1234
                  </div>
                </div>
                <Button variant="outline">
                  <EditIcon />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">Delivery Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6 pt-1">
            <div className="mb-2 flex items-center justify-between">
              {Object.keys(statusSteps).map((step, index) => (
                <div key={index} className="text-center">
                  <div
                    className={`mx-auto flex size-10 items-center justify-center rounded-full text-lg lg:size-12 ${index <= currentStepIndex ? "bg-green-500 text-white dark:bg-green-900" : "bg-muted border"} `}>
                    {index < currentStepIndex ? (
                      <CheckCircle className="size-4 lg:size-5" />
                    ) : (
                      {
                        processing: <Package className="size-4 lg:size-5" />,
                        shipped: <Truck className="size-4 lg:size-5" />,
                        "out-for-delivery": <Truck className="size-4 lg:size-5" />,
                        delivered: <CheckCircle2 className="size-4 lg:size-5" />
                      }[step as OrderStatus]
                    )}
                  </div>
                  <div className="mt-2 text-xs">{statusSteps[step as OrderStatus]}</div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <Progress
                className="w-full"
                value={(currentStepIndex / (Object.keys(statusSteps).length - 1)) * 100}
                color="bg-green-200 dark:bg-green-800"
              />
              <div className="text-muted-foreground text-xs">
                <Badge variant="info" className="me-1">
                  {currentStep}
                </Badge>{" "}
                on December 23, 2024
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-end">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={`https://bundui-images.netlify.app${item.image}`}
                        width={60}
                        height={60}
                        className="h-10 w-10 rounded-md lg:h-16 lg:w-16"
                        alt=""
                        unoptimized
                      />
                      <span>{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-center">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-end">
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
