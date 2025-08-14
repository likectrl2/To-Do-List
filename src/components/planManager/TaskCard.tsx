"use client";

import { cn } from '@/lib/utils';
import { Task } from '@/type/plan';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface TaskCardPara {
    className?: string
    task: Task
    selectedId: string
    setSelectedId: (id: string) => void
}

export default function TaskCard({className, task, selectedId, setSelectedId}: TaskCardPara) {
    const isFirstRenderRef = useRef(true);
    const lastContentRef = useRef({ title: task.title, isCompleted: task.isCompleted });
    const animationKeyRef = useRef(0);

    useEffect(() => {
        const contentChanged = 
            lastContentRef.current.title !== task.title || 
            lastContentRef.current.isCompleted !== task.isCompleted;

        if (contentChanged && !isFirstRenderRef.current) {
            animationKeyRef.current += 1;
            lastContentRef.current = { title: task.title, isCompleted: task.isCompleted };
        }
    }, [task.title, task.isCompleted]);

    const isSelected = selectedId === task.id;

    return (
        <motion.div
            key={`${task.id}-${animationKeyRef.current}`}
            className={cn(
                "bg-neutral-900 rounded-sm flex flex-col justify-center cursor-pointer",
                className
            )}
            initial={
                isFirstRenderRef.current
                    ? { height: 0, padding: 0, opacity: 0 }
                    : { x: -30, opacity: 0.3 }
            }
            animate={{
                height: "3rem",
                padding: "0.5rem",
                x: 0,
                opacity: task.isCompleted ? 0.5 : 1,
                backgroundColor: isSelected ? "#404040" : "#171717",
                scale: isSelected ? 1.01 : 1
            }}
            exit={{
                height: 0,
                padding: 0,
                opacity: 0,
                x: "-100%",
                transition: { duration: 0.3 }
            }}
            transition={{
                type: "spring",
                stiffness: isFirstRenderRef.current ? 200 : 300,
                damping: 25,
                duration: isFirstRenderRef.current ? 0.5 : 0.25
            }}
            whileHover={{
                backgroundColor: isSelected ? "#525252" : "#404040",
                scale: 1.02
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedId(task.id)}
            onAnimationComplete={() => {
                isFirstRenderRef.current = false;
            }}
        >
            <div className='flex items-center'>
                <span className={cn("flex-1", {"line-through" : task.isCompleted})}>
                    {task.title}
                </span>
            </div>
        </motion.div>
    )
}