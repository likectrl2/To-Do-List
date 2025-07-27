import type { AppState, Task } from "../types"

export type TaskChangeable = Partial<Omit<Task, "id" | "isCompleted">>
export type InnerTaskChangeable = Partial<Omit<Task, "id">>

export type PlanReducerAction = 
    | { type: "ADD_TASK", payload: { id: string }}
    | { type: "CHANGE_TASK", payload: { taskId: string, changes: TaskChangeable } }
    | { type: "TOGGLE_COMPLETION", payload: { taskId: string } }

const findTask = (state: AppState, taskId: string): Task | undefined => {
    return state.tasks.find(t => t.id === taskId);
}

const replaceTask = (state: AppState, taskId: string, newTask: Task): AppState => {
    return {
        ...state,
        tasks: state.tasks.map(t => t.id === taskId ? newTask : t)
    }
}

const changeState = (state: AppState, taskId: string, changes: InnerTaskChangeable): AppState => {
    const taskToChange = findTask(state, taskId);

    if(!taskToChange) return state;
    return replaceTask(state, taskId, { ...taskToChange, ...changes });
}

export function planReducer(state: AppState, action: PlanReducerAction): AppState {
    
    switch(action.type) {
        case("ADD_TASK"): {
            const { id } = action.payload;

            const newTask: Task = {    //默认任务模板
                id: id,
                title: "新建任务",
                description: "",
                isCompleted: false,
            };
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    newTask,
                ]
            }
        }

        case("CHANGE_TASK"): {
            const { taskId, changes } = action.payload;

            return changeState(state, taskId, changes);
        }

        case("TOGGLE_COMPLETION"): {
            const { taskId } = action.payload;

            const task = findTask(state, taskId);

            if(!task) return state;
            return changeState(state, taskId, { isCompleted: !task.isCompleted})
        }

        default: {
            return state;
        }
    }
}