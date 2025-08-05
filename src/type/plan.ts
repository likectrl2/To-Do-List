import { Task as PrismaTask } from '@prisma/client';

export type Task = PrismaTask;

export type TaskAddOption = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type TaskChangeable = Omit<Task, "id" | "createdAt" | "updatedAt" | "isCompleted">

export type TaskEditedable = Pick<Task, "title" | "isCompleted">

export function taskCompletedNext(task: Task): Task["isCompleted"] {
    return !task.isCompleted;
}

export function createTask(): TaskAddOption {
    return {
        title: "新建任务",
        isCompleted: false
    }
}

export function changeTask(task: Task, changes: TaskChangeable): Task {
    return {
        ...task,
        ...changes
    }
}

export function toggleCompletedTask(task: Task): Task {
    return {
        ...task,
        isCompleted: !task.isCompleted
    }
}