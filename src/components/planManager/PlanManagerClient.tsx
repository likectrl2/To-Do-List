"use client";

import PlanManagerMain from '../../components/planManager/PlanManagerMain';
import { Task } from "@/type/plan";
import { useEffect, useMemo, useState } from "react";
import PlanManagerToolbar from "@/components/planManager/PlanManagerToolbar";
import PlanManagerAside from "@/components/planManager/PlanManagerAside";
import { AnimatePresence, motion } from 'framer-motion';

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

    const hasSelectedTask = Boolean(selectedTask);

    useEffect(
        () => {
            if(filter.length === 0) { setFilteredTasks(tasks); return; }
            setFilteredTasks(tasks.filter(t => t.title.toLowerCase().includes(filter)))
        }, [tasks, filter]
    )

    const memoizedEditedTask = useMemo(() => {
        return selectedTask ? {...selectedTask} : undefined;
    }, [selectedTask]);

    useEffect(() => {
        setEditedTask(memoizedEditedTask);
    }, [memoizedEditedTask]);

    return (
        <>
            <div className="h-full flex flex-col relative">
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

                <AnimatePresence>
                    {
                        hasSelectedTask &&
                        <motion.div
                            className="absolute inset-0 bg-black/20 backdrop-blur-xs z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setSelectedId("")}
                        />
                    }
                </AnimatePresence>
            </div>
            <div className="fixed inset-x-2 bottom-12 z-50">
                <PlanManagerAside
                    editedTask={editedTask}
                    setEditedTask={setEditedTask} 
                    selectedTask={selectedTask!}
                />
            </div>
        </>
    )
}