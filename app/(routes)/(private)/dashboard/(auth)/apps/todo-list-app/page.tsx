import React from "react";
import { generateMeta } from "@/lib/utils";
import { promises as fs } from "fs";
import path from "path";

import Tasks from "@/app/(routes)/dashboard/(auth)/apps/todo-list-app/tasks";

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "app/dashboard/(auth)/apps/todo-list-app/data/tasks.json")
  );
  return JSON.parse(data.toString());
}

export async function generateMetadata() {
  return generateMeta({
    title: "Todo List App",
    description:
      "Organize your tasks, add new tasks and view task details with the to-do list app template. Built with shadcn/ui, Next.js and Tailwind CSS.",
    canonical: "/apps/todo-list-app"
  });
}

export default async function Page() {
  const tasks = await getTasks();

  return <Tasks tasks={tasks} />;
}
