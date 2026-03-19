export type TaskId = string;

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

// Alias interesante
export type CreateTaskInput = Omit<
  Task,
  "id" | "createdAt" | "completedAt"
>;

export type Priority = Task["priority"];