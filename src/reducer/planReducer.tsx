import { AppState } from "@/type/appState";
import { Task, TaskChangeable } from "@/type/plan";

type PlanReducerAction =
    | { type: "ADD_TASK", payload: { task: Task } }                     //将一个任务添加到数据中
    | { type: "DELETE_TASK", payload: { id: string } }                  //从数据中删除一个任务
    | { type: "TOGGLE_COMPLETION_TASK", payload: { id: string } }       //转换任务的完成情况
    | { type: "CHANGE_TASK", payload: { id: string, changes: Partial<TaskChangeable> } }

export default function planReducer(initState: AppState, action: PlanReducerAction): AppState {            //提供数据处理方法
    const finalState: AppState = initState;
    
    switch(action.type) {
        case "ADD_TASK": {
            finalState.tasks = [...initState.tasks, action.payload.task];
            break;
        }

        case "DELETE_TASK": {
            finalState.tasks = initState.tasks.filter(t => t.id !== action.payload.id);
            break;
        }

        case "TOGGLE_COMPLETION_TASK": {
            finalState.tasks = initState.tasks.map(t => t.id === action.payload.id ? {...t, isCompletion: !t.isCompletion} : t);
            break;
        }

        case "CHANGE_TASK": {
            finalState.tasks = initState.tasks.map(t => t.id === action.payload.id ? {...t, ...action.payload.changes} : t);
            break;
        }

        default: {
            break;
        }
    }

    return finalState;
}