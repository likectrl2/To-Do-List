export interface Task {
    id: string;
    title: string;
    isCompletion: boolean;
    createAt: number;
    updateAt: number;
}

export type TaskChangeable = Omit<Task, "id" | "createTime" | "isCompletion">

export function createTask(para: Partial<Task> = {}): Task {
    return {
        title: "新建任务",
        isCompletion: false,

        ...para,
    } as Task;
}