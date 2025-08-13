"use server";

import { revalidatePath } from "next/cache";
import { addTaskInDb, changeTaskInDb, deleteTaskInDb, toggleCompletedTaskInDb } from "./service";
import { Task } from "@prisma/client";
import { createTask, TaskAddRequire, TaskChangeable } from "@/type/plan";

const TASK_PATH = "/planManager";

export async function addTaskForDb(options?: Partial<TaskAddRequire>): Promise<Task> {
    const newTask = await addTaskInDb({ ...(await createTask()), ...options });
    
    revalidatePath(TASK_PATH);

    return newTask;
}

export async function deleteTaskForDb(taskId: string): Promise<void> {
    await deleteTaskInDb(taskId);
    revalidatePath(TASK_PATH);
}

export async function changeTaskForDb(taskId: string, changes: Partial<TaskChangeable>): Promise<void> {
    await changeTaskInDb(taskId, changes);
    revalidatePath(TASK_PATH);
}

export async function toggleCompletedTaskForDb(taskId: string): Promise<void> {
    await toggleCompletedTaskInDb(taskId)
    revalidatePath(TASK_PATH);
}