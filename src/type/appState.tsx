import { Task } from './plan';

export interface AppState {
    tasks: Task[];
}

export function createAppState(para: Partial<AppState> = {}): AppState {
    return {
        tasks: [] as Task[],

        ...para,
    } as AppState;
}