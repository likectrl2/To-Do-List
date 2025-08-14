"use client";

import { Task } from "@/type/plan";
import TaskCard from "./TaskCard";
import { cn } from '../../lib/utils';
import { AnimatePresence } from "framer-motion";

interface PlanManagerMainPara {
    className: string 
    tasks: Task[]
    selectedId: string
    setSelectedId: (id: string) => void
}

export default function PlanManagerMain({className, tasks, selectedId, setSelectedId}: PlanManagerMainPara) {
    return (
        <main className={cn(
            "overflow-y-auto overflow-x-hidden flex flex-col",
            className
        )}>
            <section className="bg-neutral-900 mx-3 mt-2 rounded-sm flex flex-col">
                <AnimatePresence mode="popLayout">
                    {tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            selectedId={selectedId} 
                            setSelectedId={setSelectedId}
                        />
                    ))}
                </AnimatePresence>
            </section>
        </main>
    );
}