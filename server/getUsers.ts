import { db } from "@/lib/db/drizzle";
import { user } from "@/lib/db/schema";


export async function getUsers() {
  const rows = await db.select().from(user).limit(100);

  return rows.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    country: '',
    role: 'u.role',
    image: u.image,
    status: 'u.status',
    plan_name: 'u.planName', // map DB column "planName" → expected "plan_name"
  }));
}
