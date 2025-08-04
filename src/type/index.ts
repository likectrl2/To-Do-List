"use server";

import { Task as PrismaTask } from "@prisma/client";

export type Task = PrismaTask;

export interface AppState {
    tasks: Task[];
}