import planReducer from "@/reducer/planReducer";
import { createAppState } from "@/type/appState";
import { createTask, Task, TaskChangeable } from "@/type/plan";
import { useCallback, useReducer } from "react";

export default function usePlanState() {                                //暴露处理方法和工具函数
    const initState = createAppState();
    const [state, planDispatch] = useReducer(planReducer, initState);

    const addTask = useCallback(
        (): Task => {
            const finalTask = createTask();
            planDispatch({ type: "ADD_TASK", payload: { task: finalTask } })

            return finalTask;
        }, []
    )

    const deleteTask = useCallback(
        (id: string) => {
            planDispatch({ type: "DELETE_TASK", payload: { id: id } })
        }, []
    )

    const toggleCompletionTask = useCallback(
        (id: string) => {
            planDispatch({ type: "TOGGLE_COMPLETION_TASK", payload: { id: id } })
        }, []
    )

    const changeTask = useCallback(
        (id: string, changes: Partial<TaskChangeable>) => {
            planDispatch({ type: "CHANGE_TASK", payload: { id: id, changes: changes } })
        }, []
    )

    return {
        state,
        addTask,
        deleteTask,
        toggleCompletionTask,
        changeTask,
    }
}