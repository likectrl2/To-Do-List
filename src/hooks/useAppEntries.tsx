import { useCallback, useEffect, useReducer } from "react";
import { LOCAL_STORAGE_KEY } from "../configs/constants";
import type { AppEntry, Task, Project, EntryReducerAction, WorkItem, AppEntries, canTaskChange, canProjectChange } from "../types";
import { v4 } from "uuid";

function loadEntriesFromStorage(): AppEntries {
    try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stored) return { tasks: [], projects: [] };

        const parsed = JSON.parse(stored);

        if (typeof parsed === "object" && parsed.tasks && parsed.projects) {
        return parsed;
        }

        return { tasks: [], projects: [] };
    } catch (e) {
        console.warn("Failed to load entries from localStorage:", e);
        return { tasks: [], projects: [] };
    }
}


const nextStatus = (entry: AppEntry): WorkItem["status"] => {
    if(entry.status !== "completed") {
        return "completed";
    }
    else {
        return "toDo";
    }
}

function applyToEntries(
    entries: AppEntries,
    operation: {
        tasks?: (tasks: Task[]) => Task[];
        projects?: (projects: Project[]) => Project[];
    }
): AppEntries {
    return {
        tasks: operation.tasks ? operation.tasks(entries.tasks) : entries.tasks,
        projects: operation.projects ? operation.projects(entries.projects) : entries.projects
    };
}

function updateEntry<T extends AppEntry>(array: T[], id: string, updateFn: (entry: T) => T): T[] {
    return array.map(entry => entry.id === id ? updateFn(entry) : entry);
}

function entryReducer(entries: AppEntries, action: EntryReducerAction): AppEntries {
    switch(action.type) {
        case "CREATE": {
            const newEntry = action.payload;

            if (newEntry.type === 'Task') {
                return applyToEntries(entries, {
                    tasks: (tasks: Task[]) => [...tasks, newEntry]
                });
            } else {
                return applyToEntries(entries, {
                    projects: (projects: Project[]) => [...projects, newEntry]
                });
            }
        }

        case "TOGGLE_STATUS": {
            const { id } = action.payload;
            return applyToEntries(entries, {
                tasks: (tasks) => updateEntry(tasks, id, entry => ({...entry, status: nextStatus(entry)})),
                projects: (projects) => updateEntry(projects, id, entry => ({...entry, status: nextStatus(entry)}))
            });
        }

        case "CHANGE": {
            const { id, options } = action.payload;

            return applyToEntries(entries, {
                tasks: (tasks) =>
                    updateEntry(tasks, id, entry => {
                        if (entry.type !== 'Task') return entry;
                        return {
                            ...entry,
                            ...options as canTaskChange
                        };
                    }),

                projects: (projects) =>
                    updateEntry(projects, id, entry => {
                        if (entry.type !== 'Project') return entry;
                        return {
                            ...entry,
                            ...options as canProjectChange
                        };
                    })
            });
        }

        case "DELETE": {
            const { id } = action.payload;
            return applyToEntries(entries, {
                tasks: (tasks) => tasks.filter(task => task.id !== id),
                projects: (projects) => projects.filter(project => project.id !== id)
            });
        }

        case "CHANGE_RELATION": {
            const { taskId, projectId } = action.payload;

            const task = entries.tasks.find(t => t.id === taskId);
            if (!task) return entries;

            const oldProjectId = task.projectId;

            return applyToEntries(entries, {
                tasks: (tasks) =>
                    updateEntry(tasks, taskId, task => ({...task, projectId})),
                projects: (projects) => {
                    let updated = [...projects];

                    if (oldProjectId) {
                        updated = updateEntry(updated, oldProjectId, project => ({...project, taskIds: project.taskIds.filter(id => id !== taskId)
                        }));
                    }
                    if (projectId) {
                        updated = updateEntry(updated, projectId, project => ({...project,taskIds: [...new Set([...project.taskIds, taskId])]}));
                    }
                    return updated;
                }
            });
        }

        default: {
            return entries;
        }
    }
}

export default function useAppEntries(initial: AppEntries = loadEntriesFromStorage()) {
    const [entries, dispatch] = useReducer(entryReducer, initial);

    useEffect(
        () => {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
            } catch (e) {
                console.warn("Failed to save entries to localStorage:", e);
            }
        }, [entries]
    );

    const createEntry = useCallback(
        (type: "Task" | "Project" ) => {
            const newEntry: Partial<AppEntry> = {
                id: v4(),
                createdAt: Date.now(),
                status: "toDo",
                description: "",
                importance: 3,
                urgency: 3,
                tags: [],
                timeFlexibility: "flexible",
                startTime: null,
                endTime: null,
                deadline: null,
                estimateDurationMinutes: null,
                type: `${type === "Task" ? "Task" : "Project"}`
            }
            let entry;
            if(type === "Task") entry = {...newEntry, contexts: [], projectId: null, title: "新建任务"} as Task;
            else entry = {...newEntry, taskIds: [], title: "新建项目"} as Project;
            dispatch({ type: "CREATE", payload: entry }) 
            return entry;
        }, [dispatch]
    );

    const toggleStatus = useCallback(
        (id: string) => {
            dispatch({ type: "TOGGLE_STATUS", payload: { id } });
        }, [dispatch]
    )

    const changeEntry = useCallback(
        (id: string, options: canTaskChange | canProjectChange) => {
            dispatch({ type: "CHANGE", payload: { id, options } });
        }, [dispatch]
    )

    const deleteEntry = useCallback(
        (id: string) => {
            dispatch({ type: "DELETE", payload: { id } });
        }, [dispatch]
    )

    const changeRelation = useCallback(
        (taskId: string, projectId: string | null) => {
            dispatch({ type: "CHANGE_RELATION", payload: { taskId, projectId } });
        }, [dispatch]
    )

    return {
        entries,
        createEntry,
        toggleStatus,
        changeEntry,
        deleteEntry,
        changeRelation
    };
}