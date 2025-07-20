import { createContext, type ReactNode } from "react"
import { useAppEntries } from "../hooks/useAppEntries"

const AppEntriesContext = createContext<ReturnType<typeof useAppEntries> | null>(null);

function getData() {
    //目前先用空代替
    return {
        tasks: [],
        projects: []
    }
}

const AppEntriesContextProvider = ({children}: {children: ReactNode}) => {
    const api = useAppEntries(getData());
    
    return (
        <AppEntriesContext.Provider value={api}>
            {children}
        </AppEntriesContext.Provider>
    )
}

export default AppEntriesContextProvider;