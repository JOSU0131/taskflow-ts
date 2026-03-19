export type TaskId = string;
// TaskId es simplemente un alias — string con otro nombre más descriptivo

export interface Task {
  id: TaskId;          // obligatorio
  title: string;       // obligatorio
  description?: string; // opcional (el ? significa "puede no existir")
  priority: "low" | "medium" | "high"; // solo estos tres valores son válidos
  completed: boolean;  // obligatorio
  createdAt: Date;     // obligatorio
  completedAt?: Date;  // opcional
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

// CreateTaskInput = Task pero sin id, createdAt ni completedAt
// porque esos los genera el sistema, no el usuario
export type CreateTaskInput = Omit<
  Task,
  "id" | "createdAt" | "completedAt"
>;

export type Priority = Task["priority"];