import type { AppEntries, Task, Project, AppEntry } from "../types";

export interface FilterOptions {
    searchTerm?: string;
    status?: string[];
    tags?: string[];
    importance?: { min?: number; max?: number };
    urgency?: { min?: number; max?: number };
}

function matchesSearchTerm(entry: AppEntry, searchTerm: string): boolean {
    if (!searchTerm.trim()) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = entry.title.toLowerCase().includes(searchLower);
    const descriptionMatch = entry.description.toLowerCase().includes(searchLower);
    
    return titleMatch || descriptionMatch;
}

function getProjectTasks(project: Project, allTasks: Task[]): Task[] {
    return allTasks.filter(task => project.taskIds.includes(task.id));
}

function getTaskProject(task: Task, allProjects: Project[]): Project | null {
    if (!task.projectId) return null;
    return allProjects.find(project => project.id === task.projectId) || null;
}

export function filterEntries(entries: AppEntries, options: FilterOptions): AppEntries {
    const { searchTerm = "", status, tags, importance, urgency } = options;
    
    if (!searchTerm.trim() && !status && !tags && !importance && !urgency) {
        return entries;
    }
    
    const filteredProjects: Project[] = [];
    const filteredTasks: Task[] = [];
    const includedTaskIds = new Set<string>();
    const includedProjectIds = new Set<string>();
    
    for (const project of entries.projects) {
        const projectMatches = matchesSearchTerm(project, searchTerm);
        
        if (projectMatches) {
        filteredProjects.push(project);
        includedProjectIds.add(project.id);
        
        const projectTasks = getProjectTasks(project, entries.tasks);
        projectTasks.forEach(task => {
            if (!includedTaskIds.has(task.id)) {
            filteredTasks.push(task);
            includedTaskIds.add(task.id);
            }
        });
        } else {
        const projectTasks = getProjectTasks(project, entries.tasks);
        const matchingTasks = projectTasks.filter(task => matchesSearchTerm(task, searchTerm));
        
        if (matchingTasks.length > 0) {
            filteredProjects.push(project);
            includedProjectIds.add(project.id);
            
            matchingTasks.forEach(task => {
            if (!includedTaskIds.has(task.id)) {
                filteredTasks.push(task);
                includedTaskIds.add(task.id);
            }
            });
        }
        }
    }
    
    for (const task of entries.tasks) {
        if (includedTaskIds.has(task.id)) {
        continue;
        }
        
        const taskProject = getTaskProject(task, entries.projects);
        const taskMatches = matchesSearchTerm(task, searchTerm);
        
        if (taskMatches) {
        filteredTasks.push(task);
        includedTaskIds.add(task.id);
        
        if (taskProject && !includedProjectIds.has(taskProject.id) && !matchesSearchTerm(taskProject, searchTerm)) {
            filteredProjects.push(taskProject);
            includedProjectIds.add(taskProject.id);
        }
        }
    }
    
    let finalProjects = filteredProjects;
    let finalTasks = filteredTasks;
    
    if (status && status.length > 0) {
        finalProjects = finalProjects.filter(project => status.includes(project.status));
        finalTasks = finalTasks.filter(task => status.includes(task.status));
    }
    
    if (tags && tags.length > 0) {
        finalProjects = finalProjects.filter(project => 
        tags.some(tag => project.tags.includes(tag))
        );
        finalTasks = finalTasks.filter(task => 
        tags.some(tag => task.tags.includes(tag))
        );
    }
    
    if (importance) {
        const { min, max } = importance;
        if (min !== undefined) {
        finalProjects = finalProjects.filter(project => project.importance >= min);
        finalTasks = finalTasks.filter(task => task.importance >= min);
        }
        if (max !== undefined) {
        finalProjects = finalProjects.filter(project => project.importance <= max);
        finalTasks = finalTasks.filter(task => task.importance <= max);
        }
    }
    
    if (urgency) {
        const { min, max } = urgency;
        if (min !== undefined) {
        finalProjects = finalProjects.filter(project => project.urgency >= min);
        finalTasks = finalTasks.filter(task => task.urgency >= min);
        }
        if (max !== undefined) {
        finalProjects = finalProjects.filter(project => project.urgency <= max);
        finalTasks = finalTasks.filter(task => task.urgency <= max);
        }
    }
    
    return {
        projects: finalProjects,
        tasks: finalTasks
    };
}

export function filterEntriesBySearch(entries: AppEntries, searchTerm: string): AppEntries {
    return filterEntries(entries, { searchTerm });
}