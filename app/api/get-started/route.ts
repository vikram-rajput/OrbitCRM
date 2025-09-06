// app/api/get-started/route.ts
import { db } from "@/lib/db/drizzle";
import { getStartedForm } from "@/lib/db/schema";
import { success } from "better-auth";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM!;
const ADMIN = process.env.ADMIN_EMAIL!;

const Schema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  businessemail: z.string().email(),
  businesscontact: z.string().min(7),
  products: z.string().optional(),
  industry: z.string().optional(),
  comments: z.string().optional(),
  tncCheckbox: z.boolean().optional()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = Schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Missing/invalid fields" }, { status: 400 });
    }
    const body = parsed.data;

    // 1) Persist first (source of truth)
    const [row] = await db
      .insert(getStartedForm)
      .values({
        firstname: body.firstname,
        lastname: body.lastname,
        businessemail: body.businessemail,
        businesscontact: body.businesscontact,
        products: body.products ?? null,
        industry: body.industry ?? null,
        comments: body.comments ?? null,
        tncCheckbox: Boolean(body.tncCheckbox)
      })
      .returning();

    // 2) Then send emails (best-effort, non-blocking for success)
    try {
      if (!process.env.RESEND_API_KEY || !FROM || !ADMIN) {
        throw new Error("Email env not configured");
      }

      const adminPromise = resend.emails.send({
        from: FROM,
        to: [ADMIN],
        subject: "New Get Started submission",
        html: `
          <h2>New Get Started submission</h2>
          <p><b>Name:</b> ${body.firstname} ${body.lastname}</p>
          <p><b>Email:</b> ${body.businessemail}</p>
          <p><b>Phone:</b> ${body.businesscontact}</p>
          <p><b>Product:</b> ${body.products ?? "-"}</p>
          <p><b>Industry:</b> ${body.industry ?? "-"}</p>
          <p><b>Comments:</b> ${body.comments ?? "-"}</p>
        `
      });

      const userPromise = resend.emails.send({
        from: FROM,
        to: [body.businessemail],
        subject: "Thanks for contacting BrandIQ",
        html: `
          <h2>Thanks, ${body.firstname}!</h2>
          <p>We’ve received your details and will reach out shortly.</p>
          <p>You can also book a slot here: <a href="https://calendly.com/brandiq-net/30min">Calendly</a></p>
        `
      });

      const [adminRes, userRes] = await Promise.allSettled([adminPromise, userPromise]);
      const adminErr = adminRes.status === "fulfilled" ? adminRes.value.error : adminRes.reason;
      const userErr = userRes.status === "fulfilled" ? userRes.value.error : userRes.reason;

      if (adminErr || userErr) {
        return NextResponse.json(
          { success: true, data: row, emailError: String(adminErr || userErr) },
          { status: 202 }
        );
      }
    } catch (emailErr: any) {
      // Email failed but form is saved; return 202 so client can still proceed.
      return NextResponse.json(
        { success: true, data: row, emailError: emailErr?.message || "Email failed" },
        { status: 202 }
      );
    }

    // 3) All good
    return NextResponse.json({ success: true, data: row }, { status: 200 });
  } catch (error) {
    console.error("Error saving form:", error);
    const e = error as Error
    return NextResponse.json({success:false, message:e.message})
  }
}
