

import type { Task, Priority } from "./models";

// ── CREAR TAREA ───────────────────────────────────────────────────────────────
// Recibe título y prioridad, devuelve una tarea completa con id y fecha

export function createTask(title: string, priority: Task ["priority"]): Task {
    return {
        id: Math.random().toString(36).substring(2),
        title,
        priority,
        completed: false,       // toda tarea nueva empieza sin completar
        createdAt: new Date(),  // fecha actual automática
    };
}

// ── COMPLETAR / DESCOMPLETAR TAREA ────────────────────────────────────────────
// Invierte el estado completed y añade/quita la fecha de completado

export function toggleTask(task: Task): Task {
    return {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : undefined
    };
}


// ── FILTRAR POR PRIORIDAD ─────────────────────────────────────────────────────
// Devuelve solo las tareas que coinciden con la prioridad indicada

export function filterByPriority(task: Task[], priority: Priority): Task[] {
    return task.filter(t => t.priority === priority);
}

// ── OBTENER ESTADÍSTICAS ─────────────────────────────────────────────────────
// Devuelve un resumen: total de tareas, cuántas completadas y cuántas pendientes

export function getStats(tasks: Task[]): {
    total: number;
    completed: number;
    pending: number;
} {
    const completed = tasks.filter(task => task.completed).length;
    return {
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
    };
}


