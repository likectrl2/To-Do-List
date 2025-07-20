import { v4 as uuidv4 } from "uuid";
import type { InnerAction, AppData, Project, Task, ProjectUpdateOption, TaskUpdateOption } from "../types";
import { useCallback, useReducer } from "react";

function appReducer(data: AppData, action: InnerAction): AppData{
    switch(action.type) {
        case 'ADD_PROJECT': {
            const newProject: Project = {
                id: uuidv4(),
                title: action.payload.title,
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
                taskIds: []
            }

            return {
                ...data,
                projects: [...data.projects, newProject]
            }
        }

        case 'ADD_TASK': {
            const newTask: Task = {
                id: uuidv4(),
                title: action.payload.title,
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
                projectId: null
            }

            let updatedProjects = data.projects;
            if(newTask.projectId) {
                updatedProjects = data.projects.map(p =>
                    p.id === newTask.projectId ?
                        {...p, taskIds: [...p.taskIds, newTask.id]}
                        : p
                )
            }

            return {
                projects: updatedProjects,
                tasks: [...data.tasks, newTask]
            }
        }

        case 'UPDATE_TASK': {
            const { id, updates } = action.payload;

            const originalTask = data.tasks.find(t => t.id === id);
            if (!originalTask) {
                console.error(`Task with id ${id} not found.`);
                return data;
            }

            const isProjectChanged = 'projectId' in updates;

            if (!isProjectChanged) {
                return {
                    ...data,
                    tasks: data.tasks.map(t =>
                        t.id === id ? { ...t, ...updates } : t
                    ),
                };
            }
            
            const oldProjectId = originalTask.projectId;
            const newProjectId = updates.projectId;

            const updatedTasks = data.tasks.map(t =>
                t.id === id ? { ...t, ...updates } : t
            );

            const updatedProjects = data.projects.map(project => {
                if (project.id === oldProjectId) {
                    return {
                        ...project,
                        taskIds: project.taskIds.filter(taskId => taskId !== id),
                    };
                }
                
                if (project.id === newProjectId) {
                    return {
                        ...project,
                        taskIds: [...project.taskIds, id],
                    };
                }

                return project;
            });

            return {
                tasks: updatedTasks,
                projects: updatedProjects,
            };
        }

        case 'UPDATE_PROJECT': {
            const { id, updates } = action.payload;

            return {
                ...data,
                projects: data.projects.map(p =>
                    p.id === id ? { ...p, ...updates } : p
                ),
            };
        }

        case 'DELETE_TASK': {
            const { id: taskIdToRemove } = action.payload;

            const taskToRemove = data.tasks.find(t => t.id === taskIdToRemove);
            if (!taskToRemove) {
                return data; 
            }
            const { projectId } = taskToRemove;

            const updatedTasks = data.tasks.filter(t => t.id !== taskIdToRemove);
            
            if (!projectId) {
                return {
                    ...data,
                    tasks: updatedTasks,
                };
            }
            
            const updatedProjects = data.projects.map(project => 
                project.id === projectId ?
                    { ...project, taskIds: project.taskIds.filter(id => id !== taskIdToRemove) }
                    : project
            );
            
            return {
                tasks: updatedTasks,
                projects: updatedProjects,
            };
        }

        case 'DELETE_PROJECT': {
            const { id: projectIdToRemove } = action.payload;
            
            const updatedProjects = data.projects.filter(p => p.id !== projectIdToRemove);

            const updatedTasks = data.tasks.map(task =>
                task.projectId === projectIdToRemove ?
                    { ...task, projectId: null }
                    : task
            );
            
            return {
                projects: updatedProjects,
                tasks: updatedTasks,
            };
        }
    }
}

export function useAppEntries(initialState: AppData) {
    const [state, dispatch] = useReducer(appReducer, initialState || { projects: [], tasks: [] });

    const addProject = useCallback(() => {
        const defaultProjectTitles = state.projects.filter(p => p.title.startsWith('新建项目'));
        const title = `新建项目 (${defaultProjectTitles.length + 1})`;

        dispatch({ type: 'ADD_PROJECT', payload: { title: title } });
    }, [state.projects]);

    const addTask = useCallback(() => {
        const defaultTaskTitles = state.tasks.filter(t => t.title.startsWith('新建任务'));
        const title = `新建任务 (${defaultTaskTitles.length + 1})`;
        
        dispatch({ type: 'ADD_TASK', payload: { title: title } });
    }, [state.tasks]);

    const updateProject = useCallback((id: string, updates: ProjectUpdateOption) => {
        dispatch({ type: 'UPDATE_PROJECT', payload: { id, updates } });
    }, []);

    const updateTask = useCallback((id: string, updates: TaskUpdateOption) => {
        dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
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
    };
}