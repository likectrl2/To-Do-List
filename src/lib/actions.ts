"use server";

import { revalidatePath } from "next/cache";
import { addTaskInDb, changeTaskInDb, deleteTaskInDb, getTaskByIdInDb } from "./service";
import { Task } from "@prisma/client";
import { createTask, TaskAddOption, TaskChangeable, taskCompletedNext } from "@/type/plan";

const TASK_PATH = "/planManager";

export async function addTaskForDb(options?: Partial<TaskAddOption>): Promise<Task> {
    const newTask = await addTaskInDb({ ...createTask(), ...options});
    
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
    const toggleTask = await getTaskByIdInDb(taskId);

    if(toggleTask) await changeTaskInDb(taskId, {isCompleted: taskCompletedNext(toggleTask)});

    revalidatePath(TASK_PATH);
}