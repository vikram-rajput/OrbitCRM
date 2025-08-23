"use client";

import React from "react";
import { ShoppingBasketIcon, Utensils } from "lucide-react";

import { useStore } from "@/app/(routes)/dashboard/(auth)/apps/pos-system/store";

import { Card, CardContent } from "@/components/ui/card";
import CartListItem from "@/app/(routes)/dashboard/(auth)/apps/pos-system/components/cart-list-item";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type POStSystemCart = {
  setShowAssignOrderDialogAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function POStSystemCartSheet({ setShowAssignOrderDialogAction }: POStSystemCart) {
  const { cart, createOrder } = useStore();

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Calculate tax (5%)
  const tax = subtotal * 0.05;

  // Calculate total
  const total = subtotal + tax;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {cart.length > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="bg-muted! fixed end-4 bottom-4 lg:hidden"
            aria-label="Cart">
            <span className="relative">
              <ShoppingBasketIcon size={16} aria-hidden="true" />
              <Badge className="absolute -top-5 left-full size-5 min-w-5 -translate-x-1/2 rounded-full px-1">
                {cart.length}
              </Badge>
            </span>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-auto px-4">
            {cart.length === 0 ? (
              <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
                <span className="text-2xl">🍪</span>
                <span>Your cart is empty.</span>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, key) => (
                  <CartListItem key={key} product={item} />
                ))}
              </div>
            )}
          </div>
          {cart.length > 0 && (
            <div className="bg-muted p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    createOrder();
                    setShowAssignOrderDialogAction(true);
                  }}>
                  <Utensils />
                  Create Order
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
