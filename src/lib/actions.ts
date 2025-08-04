"use server";

import { TaskChangeable } from "@/type/plan";
import { addTaskInDb, changeTaskInDb, deleteTaskInDb, getTaskById } from "./service";

export async function addTask() {
    return await addTaskInDb();
}

export async function deleteTask(taskId: string) {
    await deleteTaskInDb(taskId);
}

export async function toggleCompletionTask(taskId: string) {
    const task = await getTaskById(taskId);

    if(task) await changeTaskInDb(taskId, {isCompletion: !task.isCompletion});
}

export async function changeTask(taskId: string, changes: Partial<TaskChangeable>) {
    await changeTaskInDb(taskId, changes);
}