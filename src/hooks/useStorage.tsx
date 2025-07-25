import { useCallback } from "react";
import type { AppState } from "../types";

const STORAGE_KEY = "D.W.Y.L.";

export default function useStorage() {
    const storeState = useCallback(
        (state: AppState): void => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
        }, []
    )

    const getState = useCallback(
        (): AppState => {
            const storedState = localStorage.getItem(STORAGE_KEY);
            
            if(storedState) return JSON.parse(storedState);
            const emptyState: AppState = {
                tasks: []
            }
            return emptyState;
        }, []
    )

    return{
        getState,
        storeState
    }
}