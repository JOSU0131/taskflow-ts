

import type { Task, CreateTaskInput } from "./models";

const exampleTask: Task = {
  id: "1",
  title: "aprender TypeScript en projecto taskflow ts",
        description: "Aprender los conceptos básicos de TypeScript",
        priority: "high",
        completed: false,
        createdAt: new Date()
};

function createTask(input: CreateTaskInput): Task {
    const id = Math.random().toString(36).substring(2);
    return {
        ...input,
        id: Math.random().toString(36).substring(2),
        createdAt: new Date(),
    };
}



console.log(`Hello Random Ork on TypeScript!`);