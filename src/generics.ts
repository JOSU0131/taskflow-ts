import type { Task } from "./models";

// ── GENÉRICO: ORDENAR ARRAY ───────────────────────────────────────────────────
// <T> significa "cualquier tipo" — funciona con Task[], string[], number[], etc.
// keyof T significa "cualquier campo que exista en T"

export function sortBy<T>(items: T[], key: keyof T): T[] {
    return [...items].sort((a, b) => {
        // comparamos los valores de la propiedad indicada
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });
}

// ── GENÉRICO: RESPUESTA DE API ────────────────────────────────────────────────
// ApiResponse<T> envuelve cualquier dato en un formato estándar
// útil para cuando recibes datos de un servidor

export type ApiResponse<T> = {
    data: T;           // el dato real — puede ser Task, Task[], string, etc.
    error?: string;    // mensaje de error opcional
    timestamp: Date;   // cuándo se generó la respuesta
};

// Función que devuelve una tarea envuelta en ApiResponse
export function getTaskResponse(task: Task): ApiResponse<Task> {
    return {
        data: task,
        timestamp: new Date()
    };
}

// ── TYPE GUARD: isTask ────────────────────────────────────────────────────────
// Comprueba si un valor desconocido es realmente una Task
// "value is Task" le dice a TypeScript que si esta función devuelve true
// puede tratar value como Task a partir de ese punto

export function isTask(value: unknown): value is Task {
    // comprobamos que es un objeto y que tiene los campos obligatorios
    return (
        typeof value === "object" &&
        value !== null &&
        "id" in value &&
        "title" in value &&
        "priority" in value &&
        "completed" in value &&
        "createdAt" in value
    );
}