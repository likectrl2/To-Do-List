"use server";

import { revalidatePath } from "next/cache";
import { addTaskInDb, changeTaskInDb, deleteTaskInDb, getTaskByIdInDb } from "./service";
import { Task } from "@prisma/client";

type TaskChangeable = Omit<Task, "id" | "createTime" | "isCompletion">

const TASK_PATH = "/planManager";

export async function addTask(): Promise<Task> {
    const newTask = await addTaskInDb();
    revalidatePath(TASK_PATH);
    
    return newTask;
}

export async function deleteTask(taskId: string): Promise<void> {
    await deleteTaskInDb(taskId);
    revalidatePath(TASK_PATH);
}

export async function changeTask(taskId: string, changes: Partial<TaskChangeable>): Promise<void> {
    await changeTaskInDb(taskId, changes);
    revalidatePath(TASK_PATH);
}

export async function toggleCompletedTask(taskId: string): Promise<void> {
    const task = await getTaskByIdInDb(taskId);

    if(task) await changeTaskInDb(taskId, {isCompleted: !task.isCompleted});

    revalidatePath(TASK_PATH);
}