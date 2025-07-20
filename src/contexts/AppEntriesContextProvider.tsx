import type { ReactNode } from "react";
import { useAppEntries } from "../hooks/useAppEntries";
import { AppEntriesContext, getData } from "./AppEntriesContext";

const AppEntriesContextProvider = ({children}: {children: ReactNode}) => {
    const api = useAppEntries(getData());
    
    return (
        <AppEntriesContext.Provider value={api}>
            {children}
        </AppEntriesContext.Provider>
    )
}

export default AppEntriesContextProvider;