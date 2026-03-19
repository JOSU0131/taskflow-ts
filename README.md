# taskflow-ts
Proyecto TypeScript - modelado de dominio y tipado estático

    **GitHub:** https://github.com/JOSU0131/taskflow-ts

---

## Paso 1. Proyecto y configuración

    ### Estructura del proyecto

    ```
    taskflow-ts/
    ├── .gitignore          ← ignora node_modules/ y dist/
    ├── package.json        ← scripts y dependencias
    ├── tsconfig.json       ← configuración de TypeScript
    ├── src/
    │   ├── index.ts        ← punto de entrada de la app
    │   ├── models.ts       ← qué ES una tarea (tipos e interfaces)
    │   └── task-service.ts ← qué PUEDES HACER con una tarea (funciones)
    └── dist/               ← código compilado a JS (generado automáticamente)
    ```

    ---

    ### Comandos relacionados con GITHUB

    ```bash
    # Inicializar el repositorio Git
    git init

    # Conectar con GitHub
    git remote add origin https://github.com/JOSU0131/taskflow-ts.git

    # Limpiar archivos que no deben subirse a GitHub
    git rm -r --cached node_modules dist

    # Subir al repositorio por primera vez
    git push -u origin main

    # Compilar TypeScript a JavaScript
    npx tsc

    # Ejecutar el JS compilado directamente
    node dist/index.js
    ```

    ---

    ### Scripts de `package.json`

    | Script | Comando real | Qué hace |
    |---|---|---|
    | `npm run build` | `tsc` | Convierte todos los `.ts` a `.js` en la carpeta `dist/` |
    | `npm run typecheck` | `tsc --noEmit` | Revisa errores de tipos sin generar ningún archivo |
    | `npm run dev` | `ts-node src/index.ts` | Ejecuta el `.ts` directamente sin necesidad de compilar |
    | `npm run start` | `node dist/index.js` | Ejecuta el JS ya compilado en `dist/` |

    ---

    ### Fallos importantes y cómo se resolvieron

        **1 — `.gitignore` creado en la carpeta equivocada**
        Se creó dentro de `src/` en lugar de en la raíz del proyecto.
        Solución: moverlo a `taskflow-ts/` — siempre debe estar en la raíz.

        **2 — `node_modules/` y `dist/` subidos a GitHub**
        El `.gitignore` no existía cuando se hizo el primer `git add .` así que se incluyeron 574 archivos innecesarios.
        Solución:
        ```bash
        git rm -r --cached node_modules dist
        git add .
        git commit -m "fix: eliminar node_modules y dist, añadir .gitignore correcto"
        ```

        **3 — Conflicto `module: nodenext` con `type: commonjs`**
        El `tsconfig.json` tenía `"module": "nodenext"` pero el `package.json` tenía `"type": "commonjs"`. Son incompatibles.
        Solución: cambiar en `tsconfig.json` a `"module": "commonjs"`.

        **4 — `verbatimModuleSyntax: true` incompatible con CommonJS**
        Esta opción obliga a usar `import type` para todos los tipos pero genera conflictos con CommonJS.
        Solución: cambiar a `"verbatimModuleSyntax": false` en `tsconfig.json`.

        **5 — Import incorrecto en `task-service.ts`**
        Se usó `import type models = require("./models")` que no es sintaxis TypeScript estándar.
        Solución:
        ```typescript
        // ❌ MAL
        import type models = require("./models");

        // ✅ BIEN
        import type { Task, Priority } from "./models";
        ```

        **6 — Tipo de retorno incorrecto en `getStats`**
        El tipo de retorno declaraba `number: any` en lugar de `total: number`.
        Solución:
        ```typescript
        // ❌ MAL
        export function getStats(tasks: Task[]): { number: any; completed: number; pending: number }

        // ✅ BIEN
        export function getStats(tasks: Task[]): { total: number; completed: number; pending: number }
        ```

        **7 — Función inventada `orcrandomID()` no existe**
        Se usó una función que no existe para generar IDs.
        Solución:
        ```typescript
        id: Math.random().toString(36).substring(2),
        ```

        ---

### ¿Qué es TypeScript en una frase?

> JavaScript con un sistema que detecta errores **antes de ejecutar el código**, señalando exactamente el archivo y la línea donde está el problema.

---

## Stack técnico

- TypeScript 5.x
- ts-node (ejecutar `.ts` sin compilar)
- Node.js
- CommonJS modules
