import type { Task } from "./models";

// ── Partial ───────────────────────────────────────────────────────────────────
// Partial<Task> hace todos los campos opcionales
// útil para actualizar solo algunos campos sin tocar el resto

export function updateTask(task: Task, changes: Partial<Task>): Task {
    // mezclamos la tarea original con los cambios parciales
    return { ...task, ...changes };
}

// ── Pick ──────────────────────────────────────────────────────────────────────
// Pick<Task, 'id' | 'title'> crea un tipo con solo esos dos campos
// útil para vistas resumidas donde no necesitas todos los datos

export type TaskSummary = Pick<Task, "id" | "title">;

export function getTaskSummary(task: Task): TaskSummary {
    return { id: task.id, title: task.title };
}

// ── Omit ──────────────────────────────────────────────────────────────────────
// Omit<Task, 'id' | 'createdAt'> quita esos campos del tipo
// útil para formularios de creación donde el sistema genera esos campos

export type NewTaskData = Omit<Task, "id" | "createdAt" | "completedAt">;

// ── Record ────────────────────────────────────────────────────────────────────
// Record<prioridad, número> — un diccionario donde cada prioridad tiene un contador
// útil para contar cuántas tareas hay de cada prioridad

export function countByPriority(tasks: Task[]): Record<Task["priority"], number> {
    // empezamos el contador a 0 para cada prioridad
    const counter: Record<Task["priority"], number> = {
        low: 0,
        medium: 0,
        high: 0
    };

    // sumamos una por cada tarea según su prioridad
    tasks.forEach(task => {
        counter[task.priority]++;
    });

    return counter;
}