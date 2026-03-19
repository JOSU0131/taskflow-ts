
import { Task } from "./models";

const exampleTask: Task = {
  id: "1",
  title: "aprender TypeScript en projecto taskflow ts",
        description: "Aprender los conceptos básicos de TypeScript",
        priority: "high",
        completed: false,
        createdAt: new Date()
};

import { CreateTaskInput } from "./models";

function createTask(input: CreateTaskInput): {
    return {
        input,
        id: orcrandomID(),
        createdat: new Date(),
    };
}



console.log(`Hello Random Ork on TypeScript!`);