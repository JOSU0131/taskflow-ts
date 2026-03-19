

import type { Task, Priority } from "./models";


function createTask(title: string, description: string, priority: "low" | "medium" | "high") {
    const id = Math.random().toString(36).substring(2);
    return {
        id: Math.random().toString(36).substring(2),
        title,
        description,
        priority: "high",
        completed: false,
        createdAt: new Date(),
    };
}

export function toggleTaskCompleted(task: Task): Task {
    return {
        ...task,
        completed: !task.completed
    };
}

export function filterByPriority(
    tasks: Task[],
    priority: Priority
): Task[] {
    return tasks.filter(task => task.priority === priority);
}

export function getstats(tasks: Task[]): {total: number, completed: number, pending: number} {
    const completed = tasks.filter(task => task.completed).length;

    return {
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
    };
}


