"use client";

import { cn } from '@/lib/utils';
import { Task } from '@/type/plan';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { deleteTaskForDb } from '@/lib/actions';

interface TaskCardPara {
    className?: string
    task: Task
    selectedId: string
    setSelectedId: (id: string) => void
}

export default function TaskCard({className, task, selectedId, setSelectedId}: TaskCardPara) {
    return (
        <motion.div 
            key={task.id + task.title + task.isCompleted}
            className={cn(
                "bg-neutral-900 rounded-sm",
                "flex flex-col justify-center", 
                className
            )}
            variants={{
                init: { height: 0, padding: 0, margin: 0, opacity: 0 },
                default: {
                    height: "3rem", padding: "0.5rem", margin: 0,
                    opacity: task.isCompleted ? 0.5 : 1,
                    transition: { type: "tween", duration: 0.4 },
                    backgroundColor: "#171717", scale: 1
                },
                exit: { height: 0, padding: 0, margin: 0, opacity: 0, x: "-100%" },
                highlightStyle: { backgroundColor: "#404040", scale: 1.02 }
            }}
            transition={{ 
                scale: { type: "spring", stiffness: 400, damping: 40 }
            }}
            initial="init"
            animate={[
                "default",
                selectedId === task.id ? "HighlightStyle" : ""
            ]}
            exit="exit"
            whileHover="highlightStyle"
            whileTap={{ backgroundColor: "#404040", scale: 0.98 }}
            onClick={() => setSelectedId(task.id)}
        >
            <div className='flex items-center'>
                <label className={cn("flex-1", {"line-through" : task.isCompleted})}>
                    {task.title}
                </label>
            </div>
        </motion.div>
    )
}