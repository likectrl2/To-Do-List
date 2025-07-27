import { useCallback, useEffect, useReducer } from "react"
import { planReducer, type TaskChangeable } from "../states/planReducer"
import useStorage from "./useStorage"
import { v4 } from "uuid";
import type { Task } from "../types";

export default function useAppState() {
    const { getState, storeState } = useStorage();
    const [state, dispatch] = useReducer(planReducer, getState())

    useEffect(
        () => { storeState(state) }, [state, storeState]
    )
    
    const findTask = useCallback(
        (taskId: string): Task | undefined => {
            return state.tasks.find(t => t.id === taskId);
        }, [state.tasks]
    )

    const addTask = useCallback(
        () => {
            const newTaskId= v4();
            dispatch({ type: "ADD_TASK", payload: { id: newTaskId } });
        }, []
    )

    const changeTask = useCallback(
        (taskId: string, changes: TaskChangeable) => {
            dispatch({ type: "CHANGE_TASK", payload: { taskId: taskId, changes: changes }})
        }, []
    )

    const toggleTaskCompletion = useCallback(
        (taskId: string) => {
            dispatch({ type: "TOGGLE_COMPLETION", payload: { taskId: taskId }})
        }, []
    )

    return {
        state,
        findTask,
        addTask,
        changeTask,
        toggleTaskCompletion
    }
}