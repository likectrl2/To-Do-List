"use server";

import { Task as PrismaTask } from '@prisma/client';

export type Task = PrismaTask;

export type TaskAddRequire = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type TaskChangeable = Pick<Task, "title" | "estimatedDuration">

export type TaskChangeableInDb = Pick<Task, "title" | "isCompleted" | "estimatedDuration">

export async function taskCompletedNext(task: Task): Promise<boolean> {
    return !task.isCompleted;
}

export async function createTask(): Promise<TaskAddRequire> {
    return {
        title: "新建任务",
        isCompleted: false,
        estimatedDuration: null,
    }
}

export async function changeTask(task: Task, changes: Partial<TaskChangeable>): Promise<Task> {
    return {
        ...task,
        ...changes
    }
}

export async function toggleCompletedTask(task: Task): Promise<Task> {
    return {
        ...task,
        isCompleted: !task.isCompleted
    }
}