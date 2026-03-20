# taskflow-ts

Proyecto TypeScript desde cero — modelado de dominio, tipado estático, genéricos y tipos de utilidad.

**GitHub:** https://github.com/JOSU0131/taskflow-ts

---

## ¿Qué es TypeScript en una frase?

> JavaScript con un sistema que detecta errores **antes de ejecutar el código**, señalando exactamente el archivo y la línea donde está el problema.

---

## Estructura del proyecto

```
taskflow-ts/
├── .gitignore              ← ignora node_modules/ y dist/
├── package.json            ← scripts y dependencias
├── tsconfig.json           ← configuración de TypeScript
├── src/
│   ├── index.ts            ← punto de entrada — usa todo lo demás
│   ├── models.ts           ← qué ES una tarea (tipos e interfaces)
│   ├── task-service.ts     ← qué PUEDES HACER con una tarea (funciones)
│   ├── generics.ts         ← genéricos, ApiResponse y type guard
│   └── utilities.ts        ← tipos de utilidad Partial, Pick, Omit, Record
└── dist/                   ← código compilado a JS (generado automáticamente)
```

---

## Cómo compilar y ejecutar

```bash
# Instalar dependencias
npm install

# Compilar TypeScript a JavaScript
npm run build

# Verificar errores de tipos sin generar archivos
npm run typecheck

# Ejecutar directamente sin compilar (desarrollo)
npm run dev

# Ejecutar el JS compilado
npm run start
```

---

## Scripts de `package.json`

| Script | Comando real | Qué hace |
|---|---|---|
| `npm run build` | `tsc` | Convierte `.ts` a `.js` en `dist/` |
| `npm run typecheck` | `tsc --noEmit` | Revisa errores sin generar archivos |
| `npm run dev` | `ts-node src/index.ts` | Ejecuta `.ts` directamente sin compilar |
| `npm run start` | `node dist/index.js` | Ejecuta el JS ya compilado |

---

## Paso 1 — Proyecto y configuración

- Proyecto inicializado con `npm init -y`
- TypeScript instalado como dependencia de desarrollo
- `tsconfig.json` con `strict: true`, `rootDir: src`, `outDir: dist`
- Scripts `build`, `typecheck`, `dev` y `start` configurados

---

## Paso 2 — Modelado del dominio (`models.ts`)

Define los contratos de datos del proyecto:

```typescript
// Interfaz principal — molde de una tarea
interface Task {
    id: TaskId;                           // alias de string
    title: string;
    description?: string;                // opcional
    priority: "low" | "medium" | "high"; // solo estos valores son válidos
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;                  // opcional
}

// Solo los campos que pone el usuario — el sistema genera el resto
type CreateTaskInput = Omit<Task, "id" | "createdAt" | "completedAt">;

// Alias del tipo de prioridad
type Priority = Task["priority"];
```

---

## Paso 3 — Servicio de tareas (`task-service.ts`)

Funciones puras de lógica de negocio:

| Función | Qué hace |
|---|---|
| `createTask(title, priority)` | Crea una tarea nueva con id y fecha automáticos |
| `toggleTask(task)` | Invierte `completed` y actualiza `completedAt` |
| `filterByPriority(tasks, priority)` | Devuelve solo las tareas de esa prioridad |
| `getStats(tasks)` | Devuelve total, completadas y pendientes |

---

## Paso 4 — Genéricos y type guard (`generics.ts`)

```typescript
// Genérico — ordena cualquier array por cualquier campo
function sortBy<T>(items: T[], key: keyof T): T[]

// Tipo genérico — envuelve cualquier dato en formato estándar de API
type ApiResponse<T> = { data: T; error?: string; timestamp: Date }

// Type guard — comprueba si un valor desconocido es una Task
function isTask(value: unknown): value is Task
```

**¿Para qué sirve un type guard?**
Cuando recibes datos de una API externa no sabes qué tipo tienen. `isTask` permite verificarlo en tiempo de ejecución y TypeScript confía en el resultado.

---

## Paso 5 — Tipos de utilidad (`utilities.ts`)

| Tipo | Ejemplo | Para qué sirve |
|---|---|---|
| `Partial<Task>` | `updateTask(task, { title: "nuevo" })` | Actualizar solo algunos campos |
| `Pick<Task, 'id' \| 'title'>` | `getTaskSummary(task)` | Vista resumida con pocos campos |
| `Omit<Task, 'id' \| 'createdAt'>` | `NewTaskData` | Formulario sin campos del sistema |
| `Record<Priority, number>` | `countByPriority(tasks)` | Contador por prioridad |

---

## Fallos importantes y cómo se resolvieron

**1 — `.gitignore` en la carpeta equivocada**
Se creó dentro de `src/` en lugar de la raíz. Solución: moverlo a `taskflow-ts/`.

**2 — `node_modules` y `dist` subidos a GitHub**
El `.gitignore` no existía al hacer el primer `git add .`.
```bash
git rm -r --cached node_modules dist
git add .
git commit -m "fix: eliminar node_modules y dist"
```

**3 — `module: nodenext` incompatible con `type: commonjs`**
Solución: cambiar a `"module": "commonjs"` en `tsconfig.json`.

**4 — `verbatimModuleSyntax: true` incompatible con CommonJS**
Solución: cambiar a `"verbatimModuleSyntax": false`.

**5 — `exactOptionalPropertyTypes: true` demasiado estricto**
No permitía pasar `undefined` en campos opcionales.
Solución: cambiar a `"exactOptionalPropertyTypes": false`.

**6 — Import incorrecto**
```typescript
// ❌ MAL
import type models = require("./models");
// ✅ BIEN
import type { Task, Priority } from "./models";
```

**7 — Función inventada `orcrandomID()` no existe**
```typescript
// ✅ SOLUCIÓN
id: Math.random().toString(36).substring(2)
```

---

## Stack técnico

- TypeScript 5.x
- ts-node — ejecutar `.ts` sin compilar
- Node.js
- CommonJS modules
