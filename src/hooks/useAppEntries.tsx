import { v4 as uuidv4 } from "uuid";
import type { InnerAction, AppData, Project, Task, ProjectUpdateOption, TaskUpdateOption, WorkItem } from "../types";
import { useCallback, useReducer } from "react";

function getNextStatus(currentStatus: WorkItem['status']): WorkItem['status'] {
    if (currentStatus === 'completed') {
        return 'toDo';
    }
    return 'completed';
}

function shouldProjectBeCompleted(projectId: string, allTasks: Task[]): boolean {
    const relatedTasks = allTasks.filter(t => t.projectId === projectId);

    if (relatedTasks.length === 0) {
        return false;
    }

    return relatedTasks.every(t => t.status === 'completed');
}

function syncProjectStatus(
    projectIds: (string | null | undefined)[],
    currentProjects: Project[],
    currentTasks: Task[]): Project[] {
    const uniqueProjectIds = [...new Set(projectIds.filter((id): id is string => !!id))];

    if (uniqueProjectIds.length === 0) {
        return currentProjects;
    }

    let updatedProjects = currentProjects;

    uniqueProjectIds.forEach(projectId => {
        const shouldBeCompleted = shouldProjectBeCompleted(projectId, currentTasks);
        const newStatus = shouldBeCompleted ? 'completed' : 'toDo';
        
        updatedProjects = updatedProjects.map(p =>
            p.id === projectId && p.status !== newStatus ? { ...p, status: newStatus } : p
        );
    });

    return updatedProjects;
}


function appReducer(data: AppData, action: InnerAction): AppData{
    let nextData = data;

    switch(action.type) {
        case 'ADD_PROJECT': {
            nextData = {
                ...data,
                projects: [...data.projects, action.payload]
            }
            break;
        }

        case 'ADD_TASK': {
            const newTask = action.payload;
            const updatedTasks = [...data.tasks, newTask];
            
            let projectsWithNewTaskLink = data.projects;
            if(newTask.projectId) {
                projectsWithNewTaskLink = data.projects.map(p =>
                    p.id === newTask.projectId ?
                        {...p, taskIds: [...p.taskIds, newTask.id]}
                        : p
                );
            }

            const updatedProjects = syncProjectStatus([newTask.projectId], projectsWithNewTaskLink, updatedTasks);

            nextData = {
                projects: updatedProjects,
                tasks: updatedTasks
            }
            break;
        }

        case 'UPDATE_TASK': {
            const { id, updates } = action.payload;

            const originalTask = data.tasks.find(t => t.id === id);
            if (!originalTask) {
                console.error(`Task with id ${id} not found.`);
                return data;
            }

            const updatedTasks = data.tasks.map(t =>
                t.id === id ? { ...t, ...updates } : t
            );
            
            const oldProjectId = originalTask.projectId;
            const newProjectId = 'projectId' in updates ? updates.projectId : oldProjectId;

            let projectsWithUpdatedLinks = data.projects;
            if (oldProjectId !== newProjectId) {
                projectsWithUpdatedLinks = data.projects.map(project => {
                    if (project.id === oldProjectId) {
                        return { ...project, taskIds: project.taskIds.filter(taskId => taskId !== id) };
                    }
                    if (project.id === newProjectId) {
                        return { ...project, taskIds: [...project.taskIds, id] };
                    }
                    return project;
                });
            }

            const finalProjects = syncProjectStatus([oldProjectId, newProjectId], projectsWithUpdatedLinks, updatedTasks);
            
            nextData = { tasks: updatedTasks, projects: finalProjects };
            break;
        }

        case 'UPDATE_PROJECT': {
            const { id, updates } = action.payload;

            nextData = {
                ...data,
                projects: data.projects.map(p =>
                    p.id === id ? { ...p, ...updates } : p
                ),
            };
            break;
        }

        case 'TOGGLE_ENTRY_COMPLETION': {
            const originalTask = data.tasks.find(t => t.id === action.payload.id);
            if (!originalTask) {
                return data;
            }

            const updatedTasks = data.tasks.map(task => 
                task.id === action.payload.id
                    ? { ...task, status: getNextStatus(task.status) } 
                    : task
            );
            
            const updatedProjects = syncProjectStatus([originalTask.projectId], data.projects, updatedTasks);
            
            nextData = { tasks: updatedTasks, projects: updatedProjects };
            break;
        }

        case 'DELETE_TASK': {
            const { id: taskIdToRemove } = action.payload;

            const taskToRemove = data.tasks.find(t => t.id === taskIdToRemove);
            if (!taskToRemove) {
                return data; 
            }
            const { projectId } = taskToRemove;

            const updatedTasks = data.tasks.filter(t => t.id !== taskIdToRemove);
            
            let projectsWithUpdatedLinks = data.projects;
            if (projectId) {
                projectsWithUpdatedLinks = data.projects.map(project => 
                    project.id === projectId ?
                        { ...project, taskIds: project.taskIds.filter(id => id !== taskIdToRemove) }
                        : project
                );
            }
            
            const finalProjects = syncProjectStatus([projectId], projectsWithUpdatedLinks, updatedTasks);

            nextData = { tasks: updatedTasks, projects: finalProjects};
            break;
        }

        case 'DELETE_PROJECT': {
            const { id: projectIdToRemove } = action.payload;
            
            const updatedProjects = data.projects.filter(p => p.id !== projectIdToRemove);

            const updatedTasks = data.tasks.map(task =>
                task.projectId === projectIdToRemove ?
                    { ...task, projectId: null }
                    : task
            );
            
            nextData = {
                projects: updatedProjects,
                tasks: updatedTasks,
            };
            break;
        }
    }
    return nextData;
}

export function useAppEntries(initialState?: AppData) {
    const [state, dispatch] = useReducer(appReducer, initialState || { projects: [], tasks: [] });

    const addProject = useCallback((options?: ProjectUpdateOption): Readonly<Project> => {
        
        const defaultProjectTitles = state.projects.filter(p => p.title.startsWith('新建项目'));
        const title = options?.title || `新建项目 (${defaultProjectTitles.length + 1})`;

        const newProject: Project = {
            id: uuidv4(), 
            title,
            description: '',
            createdAt: Date.now(),
            status: 'toDo',
            timeFlexibility: 'flexible',
            startTime: null,
            endTime: null,
            deadline: null,
            estimateDurationMinutes: null,
            importance: 3,
            urgency: 3,
            tags: [],
            type: 'Project',
            taskIds: [],
            ...options,
        };
        
        dispatch({ type: 'ADD_PROJECT', payload: newProject });
        
        return newProject;

    }, [state.projects]);

    const addTask = useCallback((options?: TaskUpdateOption): Readonly<Task> => {

        const defaultTaskTitles = state.tasks.filter(t => t.title.startsWith('新建任务'));
        const title = options?.title || `新建任务 (${defaultTaskTitles.length + 1})`;

        const newTask: Task = {
            id: uuidv4(),
            title,
            description: '',
            createdAt: Date.now(),
            status: 'toDo',
            timeFlexibility: 'flexible',
            startTime: null,
            endTime: null,
            deadline: null,
            estimateDurationMinutes: null,
            importance: 3,
            urgency: 3,
            tags: [],
            type: 'Task',
            context: [],
            projectId: null,
            ...options, 
        };

        dispatch({ type: 'ADD_TASK', payload: newTask });

        return newTask;
        
    }, [state.tasks]);

    const updateProject = useCallback((id: string, updates: ProjectUpdateOption) => {
        dispatch({ type: 'UPDATE_PROJECT', payload: { id, updates } });
    }, []);

    const updateTask = useCallback((id: string, updates: TaskUpdateOption) => {
        dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
    }, []);

    const toggleEntryCompletion = useCallback((id: string) => {
        dispatch({ type: 'TOGGLE_ENTRY_COMPLETION', payload: { id } });
    }, []);
    
    const deleteProject = useCallback((id: string) => {
        dispatch({ type: 'DELETE_PROJECT', payload: { id } });
    }, []);

    const deleteTask = useCallback((id: string) => {
        dispatch({ type: 'DELETE_TASK', payload: { id } });
    }, []);

    return {
        // Data
        projects: state.projects,
        tasks: state.tasks,
        // Methods
        addProject,
        addTask,
        updateProject,
        updateTask,
        deleteProject,
        deleteTask,
        toggleEntryCompletion
    };
}