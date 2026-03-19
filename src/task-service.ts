import type models = require("./models");

function createTask(title: string, description: string, priority: "low" | "medium" | "high") {
    return {
        id: orcrandomID(),
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
    priority: models.Priority
): Task[] {
    return tasks.filter(task => task.priority === priority);
}

export function getstats(tasks: Task[]): {
    const completed = tasks.filter(task => task.completed).length;

    return {
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
};


