import { createContext, useContext } from "react"
import useAppEntries from "../hooks/useAppEntries"

export const AppEntriesContext = createContext<ReturnType<typeof useAppEntries> | null>(null);

export function useAppContext() {
    const context = useContext(AppEntriesContext);
    if (!context) {
        throw new Error('useAppContext must be used inside AppEntriesContextProvider');
    }
    return context;
}