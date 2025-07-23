export interface WorkItem {
    id: string;
    createdAt: number;
    
    status: 'toDo' | 'inProgress' | 'completed' | 'canceled';
    
    title: string;
    description: string;
    importance: number;
    urgency: number;
    tags: string[];
    timeFlexibility: 'flexible' | 'semi-flexible' | 'fixed';
    startTime: number | null;
    endTime: number | null;
    deadline: number | null;
    estimateDurationMinutes: number | null;
}

export interface Task extends WorkItem {
    type: 'Task';
    
    contexts: string[];
    projectId: string | null;
}

export interface Project extends WorkItem {
    type: 'Project';
    taskIds: string[];
}

export type AppEntry = Task | Project;

export type AppEntries = {
    tasks: Task[];
    projects: Project[];
}

export type EntryReducerAction =
    { type: "CREATE", payload: Task | Project } |
    { type: "TOGGLE_STATUS", payload: { id: string } } |
    { type: "CHANGE", payload: { id: string, options: canTaskChange | canProjectChange } } |
    { type: "DELETE", payload: { id: string } } |
    { type: "CHANGE_RELATION", payload: { taskId: string; projectId: string | null } }
    
export type canChange = Omit<AppEntry, 'id' | 'createdAt' | 'type' | 'status'>;
export type canTaskChange = Partial<Omit<Task, 'projectId'> | canChange>;
export type canProjectChange = Partial<Omit<Project, 'taskIds'> | canChange>;

export interface ProjectWithTask extends Project {
    tasks: Task[];
}