"use client";

import PlanManagerMain from '../../components/planManager/PlanManagerMain';
import { Task } from "@/type/plan";
import { useEffect, useMemo, useState } from "react";
import PlanManagerToolbar from "@/components/planManager/PlanManagerToolbar";
import PlanManagerAside from "@/components/planManager/PlanManagerAside";

interface PlanManagerClient {
    tasks: Task[]
}

export default function PlanManagerClient({tasks}: PlanManagerClient) {
    const [selectedId, setSelectedId] = useState<string>("");
    const [editedTask, setEditedTask] = useState<Task | undefined>(undefined);
    const [filter, setFilter] = useState<string>("");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

    const selectedTask: Task | undefined = useMemo(
        () => tasks.find(t => t.id === selectedId),
        [selectedId, tasks]
    )

    useEffect(
        () => {
            if(filter.length === 0) { setFilteredTasks(tasks); return; }
            setFilteredTasks(tasks.filter(t => t.title.toLowerCase().includes(filter)))
        }, [tasks, filter]
    )

    useEffect(
        () => {
            setEditedTask(selectedTask!);
        }, [selectedId, selectedTask, tasks]
    )

    return (
        <div className="h-full flex flex-col   relative">
            <PlanManagerToolbar 
                className="h-9" 
                setSelectedId={setSelectedId}
                filter={filter}
                setFilter={setFilter}
            />
            <PlanManagerMain
                className="flex-1" 
                tasks={filteredTasks} 
                selectedId={selectedId} 
                setSelectedId={setSelectedId}
            />
            <PlanManagerAside
                className="absolute bottom-0 left-2 right-2" 
                editedTask={editedTask}
                setEditedTask={setEditedTask} 
                selectedTask={selectedTask!}
            />
        </div>
    )
        
}