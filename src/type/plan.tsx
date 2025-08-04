import { v4 } from "uuid";

export interface Task {
    id: string;
    title: string;
    isCompletion: boolean;
    createTime: number;
}

export type TaskChangeable = Omit<Task, "id" | "createTime" | "isCompletion">

export function createTask(para: Partial<Task> = {}): Task {
    return {
        id: v4(),
        title: "新建任务",
        isCompletion: false,
        createTime: Date.now(),

        ...para,
    } as Task;
}