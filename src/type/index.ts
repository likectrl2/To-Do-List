"use server";

import { Task } from "./plan";

export interface AppState {
    tasks: Task[];
}