import type { Task, CreateTaskInput } from "./models";
import { createTask, toggleTask, filterByPriority, getStats } from "./task-service";

// ── CREAR TAREAS DE EJEMPLO ───────────────────────────────────────────────────

const tarea1 = createTask("Pintar Orco Warboss", "high");
const tarea2 = createTask("Organizar el taller", "medium");
const tarea3 = createTask("Hacer ejercicio", "low");
const tarea4 = createTask("Leer documentación TS", "high");

const tareas: Task[] = [tarea1, tarea2, tarea3, tarea4];

// ── COMPLETAR UNA TAREA ───────────────────────────────────────────────────────
// toggleTask invierte el estado — de false a true

const tarea1Completada = toggleTask(tarea1);
console.log("Tarea completada:", tarea1Completada.title, "→", tarea1Completada.completed);

// ── FILTRAR POR PRIORIDAD ─────────────────────────────────────────────────────

const tareasAltas = filterByPriority(tareas, "high");
console.log("Tareas de alta prioridad:", tareasAltas.map(t => t.title));

// ── ESTADÍSTICAS ──────────────────────────────────────────────────────────────

const stats = getStats(tareas);
console.log("Estadísticas:", stats);

console.log("Hello Random Ork on TypeScript!");


import { sortBy, getTaskResponse, isTask } from "./generics";

// ── PROBAR sortBy ─────────────────────────────────────────────────────────────
// Ordenamos las tareas por título alfabéticamente
const tareasOrdenadas = sortBy(tareas, "title");
console.log("Tareas ordenadas por título:", tareasOrdenadas.map(t => t.title));

// ── PROBAR ApiResponse ────────────────────────────────────────────────────────
// Envolvemos una tarea en el formato estándar de respuesta
const respuesta = getTaskResponse(tarea1);  
console.log("Respuesta API:", respuesta);

// ── PROBAR isTask ─────────────────────────────────────────────────────────────
// Comprobamos si un objeto desconocido es una Task válida
const objetoDesconocido: unknown = { id: "99", title: "¿Soy una tarea?", priority: "low", completed: false, createdAt: new Date() };
const objetoInvalido: unknown = { nombre: "Orco", nivel: 5 };

console.log("¿Es una Task?", isTask(objetoDesconocido)); // true
console.log("¿Es una Task?", isTask(objetoInvalido));    // false