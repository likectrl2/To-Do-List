"use server";

import { Task } from "@prisma/client";
import { prisma } from "./prisma";

type TaskChangeableInDb = Partial<Omit<Task, "id" | "createAt" | "updateAt">>

export async function addTaskInDb(): Promise<Task> {
    return await prisma.task.create({ data: {} });
}

export async function deleteTaskInDb(taskId: string): Promise<void> {
    await prisma.task.delete(
        {
            where: {
                id: taskId
            }
        }
    )
}

export async function changeTaskInDb(taskId: string, changes: Partial<TaskChangeableInDb>): Promise<void> {
    await prisma.task.update(
        {
            where: {
                id: taskId
            },
            data: changes
        }
    )
}

export async function getTaskByIdInDb(taskId: string): Promise<Task | null> {
    return await prisma.task.findUnique(
        {
            where: {
                id: taskId
            }
        }
    )
}

export async function getAllTasksInDb(): Promise<Task[]> {
    return await prisma.task.findMany();
}