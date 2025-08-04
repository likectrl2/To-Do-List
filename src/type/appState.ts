import { Task } from "@prisma/client";

export interface AppState {
    tasks: Task[];
}