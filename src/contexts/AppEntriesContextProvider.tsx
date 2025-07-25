import type { ReactNode } from "react";
import useAppEntries from "../hooks/useAppEntries";
import { AppEntriesContext } from "./AppEntriesContext";

const AppEntriesContextProvider = ({children}: {children: ReactNode}) => {
    const api = useAppEntries();
    
    return (
        <AppEntriesContext.Provider value={api}>
            {children}
        </AppEntriesContext.Provider>
    )
}

export default AppEntriesContextProvider;