"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  businessemail: z.string().email("Enter a valid email"),
  businesscontact: z.string().min(7, "Enter a valid phone"),
  products: z.string().optional(),
  industry: z.string().optional(),
  comments: z.string().optional(),
  // Require checkbox to be true
  tncCheckbox: z.boolean().refine((v) => v === true, {
    message: "You must accept the Terms and Conditions",
  }),
  // Honeypot to catch bots (hidden input)
  website: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function GetStartedForm() {
  const [pending, setPending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      businessemail: "",
      businesscontact: "",
      products: undefined,
      industry: undefined,
      comments: "",
      tncCheckbox: false,
      website: "", // honeypot
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: FormValues) {
    if (pending) return;

    // Bot check
    if (values.website) {
      toast.error("Unable to submit at this time.");
      return;
    }

    // Open a named tab synchronously to avoid popup blockers.
    // We'll only navigate it after success.
    // const calendlyTab = window.open("", "calendly_tab");

    try {
      setPending(true);
      const res = await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data?.message || "Failed to submit form");
      }

      toast.success("Form submitted successfully!");
      form.reset();

      // Navigate the pre-opened tab on success
      // if (calendlyTab) {
      //   // calendlyTab.location.href = "https://calendly.com/brandiq-net/30min";
      //   calendlyTab.focus();
      // }
    } catch (error: any) {
      console.error("Form submission error", error);
      toast.error(
        error?.message || "Failed to submit the form. Please try again."
      );
      // Close the tab if we opened one but failed
      // if (calendlyTab && !calendlyTab.closed) calendlyTab.close();
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8 py-10"
      >
        {/* Honeypot (keep hidden) */}
        <input
          type="text"
          autoComplete="off"
          tabIndex={-1}
          className="hidden"
          {...form.register("website")}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="w-full md:w-1/2">
            <FormField
              control={form.control}
              name="businessemail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Business Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2">
            <FormField
              control={form.control}
              name="businesscontact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Mobile Number" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="w-full md:w-1/2">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fashion">
                        Fashion and Apparel
                      </SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full md:w-1/2">
            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority area of interest</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PLM">PLM Suite</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your comments"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tncCheckbox"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  // shadcn Checkbox returns boolean | "indeterminate"
                  onCheckedChange={(val) => field.onChange(val === true)}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>I accept the Terms and Conditions</FormLabel>
                <FormDescription>
                  Yes, please opt me in to receive marketing communications on
                  products, news, events and educational materials. I can
                  unsubscribe at a later time.
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
