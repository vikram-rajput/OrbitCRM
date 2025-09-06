import { db } from "@/lib/db/drizzle";
import { getStartedForm, } from "@/lib/db/schema";


export async function getLeads() {
  const rows = await db.select().from(getStartedForm).limit(100);

  return rows.map((u) => ({
    id: u.id,
    name: u.firstname,
    email: u.businessemail,
    country: u.businesscontact,
    role: u.industry,
    image: '',
    status: u.products,
    plan_name: u.tncCheckbox, // map DB column "planName" → expected "plan_name"
  }));
}
