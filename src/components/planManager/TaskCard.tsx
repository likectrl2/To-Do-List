"use client";

import { cn } from '@/lib/utils';
import { Task } from '@/type/plan';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface TaskCardPara {
    className?: string
    task: Task
    selectedId: string
    setSelectedId: (id: string) => void
}

export default function TaskCard({className, task, selectedId, setSelectedId}: TaskCardPara) {
    const hasEnteredRef = useRef(false);
    const [animationTrigger, setAnimationTrigger] = useState(0);
    const previousContentRef = useRef({ title: task.title, isCompleted: task.isCompleted });
    
    useEffect(() => {
        const contentChanged = 
            previousContentRef.current.title !== task.title || 
            previousContentRef.current.isCompleted !== task.isCompleted;
        
        if (contentChanged && hasEnteredRef.current) {
            setAnimationTrigger(prev => prev + 1);
        }
        
        previousContentRef.current = { title: task.title, isCompleted: task.isCompleted };
    }, [task.title, task.isCompleted]);

    return (
        <motion.div
            layout
            key={`${task.id}-${animationTrigger}`}
            className={cn(
                "bg-neutral-900 rounded-sm",
                "flex flex-col justify-center", 
                className
            )}
            variants={{
                init: { height: 0, padding: 0, opacity: 0 },
                default: {
                    height: "3rem", padding: "0.5rem",
                    opacity: task.isCompleted ? 0.5 : 1,
                    transition: { type: "tween", duration: 0.4 }
                },
                fadeFromLeft: {
                    height: "3rem", padding: "0.5rem", x: 0,
                    opacity: task.isCompleted ? 0.5 : 1,
                    transition: { type: "spring", stiffness: 200, damping: 40 }
                },
                exit: { height: 0, padding: 0, margin: 0, opacity: 0, x: "-100%" }
            }}
            transition={{ scale: { type: "spring", stiffness: 400, damping: 40 } }}
            initial={hasEnteredRef.current ? { x: "-100%", opacity: 0 } : "init"}
            animate={[
                hasEnteredRef.current ? "fadeFromLeft" : "default",
                selectedId === task.id ? "highlightStyle" : ""
            ]}
            exit="exit"
            whileHover={{ backgroundColor: "#404040", scale: 1.02 }}
            whileTap={{ backgroundColor: "#404040", scale: 0.98 }}
            onClick={() => setSelectedId(task.id)}
            onAnimationComplete={() => hasEnteredRef.current = true}
        >
            <div className='flex items-center'>
                <label className={cn("flex-1", {"line-through" : task.isCompleted})}>
                    {task.title}
                </label>
            </div>
        </motion.div>
    )
}