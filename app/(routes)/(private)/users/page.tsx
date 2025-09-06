import { generateMeta } from "@/lib/common/utils";

import UsersDataTable from "./data-table";
import CustomDateRangePicker from "@/components/custom-date-range-picker";
import { getUsers } from "@/server/getUsers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export async function generateMetadata() {
  return generateMeta({
    title: "Users List",
    description:
      "A list of users generated using the Tanstack Table. Built with Tailwind CSS, Shadcn UI and Next.js.",
    canonical: "/pages/users",
  });
}

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Users</h1>
        <div className="flex items-center space-x-2">
          <CustomDateRangePicker />
          <Button asChild>
            <Link href="#">
              <PlusCircledIcon /> Invite Team Members
            </Link>
          </Button>
        </div>
      </div>

      <UsersDataTable data={users} />
    </>
  );
}
