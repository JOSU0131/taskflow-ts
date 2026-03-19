import type { Task } from "./models";

// Objeto CORRECTO
const tareaCorrecta: Task = {
    id: "1",
    title: "Aprender TypeScript",
    priority: "high",
    completed: false,
    createdAt: new Date()
};

// Objeto con ERROR A PROPÓSITO
const tareaConError: Task = {
    id: "2",
    title: "Tarea con error",
     // priority: "urgente",  // ❌ MALO: "urgente" no es un valor válido para priority
    priority: "high",  // ✅ BUENO: "high" es un valor válido para priority
    completed: false,
    createdAt: new Date()
};

console.log("Hello Random Ork on TypeScript!");