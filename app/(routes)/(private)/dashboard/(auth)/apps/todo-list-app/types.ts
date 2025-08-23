import { EnumTodoPriority, EnumTodoStatus } from "@/app/(routes)/dashboard/(auth)/apps/todo-list-app/enum";

export type TodoPriority = `${EnumTodoPriority}`;
export type TodoStatus = `${EnumTodoStatus}`;
export type FilterTab = "all" | TodoStatus;
export type ViewMode = "list" | "grid";

export interface Comment {
  id: string;
  text: string;
  createdAt: Date;
}

export interface TodoFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  assignedTo: string[];
  comments: Comment[];
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: Date;
  dueDate?: Date | null;
  reminderDate?: Date | null; // New field for reminders
  files?: TodoFile[];
  subTasks?: SubTask[];
  starred: boolean;
}

export interface TodoPosition {
  id: string;
  position: number;
}
