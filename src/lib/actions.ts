"use server";

import { addTaskInDb, changeTaskInDb, deleteTaskInDb, getTaskByIdInDb } from "./service";
import { Task } from "@prisma/client";

export type TaskChangeable = Omit<Task, "id" | "createTime" | "isCompletion">

export async function addTask(): Promise<Task> {
    return await addTaskInDb();
}

export async function deleteTask(taskId: string): Promise<void> {
    await deleteTaskInDb(taskId);
}

export async function changeTask(taskId: string, changes: Partial<TaskChangeable>): Promise<void> {
    await changeTaskInDb(taskId, changes);
}

export async function toggleCompletionTask(taskId: string): Promise<void> {
    const task = await getTaskByIdInDb(taskId);

    if(task) await changeTaskInDb(taskId, {isCompletion: !task.isCompletion});
}