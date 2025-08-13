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

    const selectedTask: Task | undefined = useMemo(
        () => tasks.find(t => t.id === selectedId),
        [selectedId, tasks]
    )

    useEffect(
        () => {
            setEditedTask(selectedTask!);
        }, [selectedId, selectedTask, tasks]
    )

    return (
        <div className="h-full flex flex-col   relative">
            <PlanManagerToolbar className="h-9" setSelectedId={setSelectedId}/>
            <PlanManagerMain
                className="flex-1" 
                tasks={tasks} 
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