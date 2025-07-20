export interface WorkItem {
    id: string;
    title: string;
    description: string;
    createdAt: number;
    
    status: 'toDo' | 'inProgress' | 'completed' | 'canceled';
    timeFlexibility: 'flexible' | 'semi-flexible' | 'fixed';
    startTime: number | null;
    endTime: number | null;
    deadline: number | null
    estimateDurationMinutes: number | null;

    importance: number;
    urgency: number;
    tags: string[];
}

export interface Task extends WorkItem {
    type: 'Task';
    
    context: string[];
    projectId: string | null;
}

export interface Project extends WorkItem {
    type: 'Project';
    taskIds: string[];
}

export type AppEntries = Task | Project; 

export interface AppData {
    projects: Project[];
    tasks: Task[];
}

export type InnerAction =
    { type: 'ADD_PROJECT'; payload: Project } |
    { type: 'ADD_TASK'; payload: Task } |
    { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } } |
    { type: 'UPDATE_PROJECT'; payload: { id: string; updates: Partial<Project> } } |
    { type: 'DELETE_PROJECT'; payload: { id: string } } |
    { type: 'DELETE_TASK'; payload: { id: string } };

export type ProjectUpdateOption = Partial<Omit<Project, 'taskIds' | 'id' | 'createdAt' | 'type'>>;
export type TaskUpdateOption = Partial<Omit<Task, 'id' | 'createdAt' | 'type'>>;