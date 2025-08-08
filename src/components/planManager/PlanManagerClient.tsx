"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { useEffect, useMemo, useState } from "react";
import InputText from "../common/InputText";
import { Task, TaskEditedable, toggleCompletedTask } from "@/type/plan";
import { addTaskForDb, changeTaskForDb, deleteTaskForDb, toggleCompletedTaskForDb } from "@/lib/actions";
import { changeTask } from '../../type/plan';
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from "@/lib/utils";

interface PlanManagerClientPara {
    tasks: Task[];
}

export default function PlanManagerClient({tasks}: PlanManagerClientPara) {    
    const [selectedTaskId, setSelectedTaskId] = useState<string>("");
    const [editedTask, setEditedTask] = useState<Task>();

    const selectedTask = useMemo(
        () => {
            return tasks.find(t => t.id === selectedTaskId);
        }, [selectedTaskId, tasks]
    )

    useEffect(
        () => {
            if(selectedTask) setEditedTask({...selectedTask});
            else setEditedTask(undefined);
        }, [selectedTask]
    )

    const handleAddTask = async () => {
        setSelectedTaskId((await addTaskForDb()).id); 
    };

    return (
        <div className="page flex flex-col relative">
            <div
                className="h-9 flex">
                <div className="flex-1"/>
                <motion.span 
                    className="h-auto m-1 rounded-sm"
                    whileHover={{ backgroundColor: "#404040" }}
                    whileTap={{ backgroundColor: "#404040", scale: 0.9 }}
                >
                    <Button
                        className="h-full p-0"
                        onClick={() => handleAddTask()}
                    >
                        +
                    </Button>
                </motion.span>
            </div>
            <main className="flex-1" onClick={() => setSelectedTaskId("")}>
                <section className="mx-3 flex flex-col bg-neutral-800 rounded-sm">
                    <AnimatePresence>
                        {
                            tasks.map(
                                (t, index) => {
                                    const isSelected = t.id === selectedTaskId;
                                    return (
                                        <motion.div
                                            layout
                                            key={t.id}
                                            className={cn("h-12 px-2 py-1 flex items-center rounded-sm", {"opacity-50" : t.isCompleted})}
                                            onClick={(e) => { e.stopPropagation(); setSelectedTaskId(t.id); }}
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={{
                                                x: 0,
                                                opacity: 1,
                                                backgroundColor: isSelected ? "#404040" : "#262626",
                                                color: t.isCompleted ? "#737373" : "#ffffff",
                                                scale: isSelected ? 1.02 : 1,
                                            }}
                                            exit={{ opacity: 0, x: "-100%", padding: 0, height: 0 }}
                                            whileHover={{ backgroundColor: "#404040", scale: 1.02 }}
                                            whileTap={{ scale: 0.98, backgroundColor: "#404040", transition:{delay:0, duration: 0.03}}}
                                            transition={{
                                                default: { type: "spring", stiffness: 400, damping: 40, delay: index * 0.04 },
                                                backgroundColor: { delay: 0 },
                                                scale: { type: "spring", stiffness: 400, damping: 40, delay: 0 }
                                            }}
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.span
                                                    className={cn("h-full content-center truncate", { "line-through": t.isCompleted })}
                                                    key={t.id + t.title }
                                                    initial={{ x: "-100%", opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    exit={{ x: "-100%", opacity: 0 }}
                                                    transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                                >
                                                    {t.title}
                                                </motion.span>
                                            </AnimatePresence>
                                        </motion.div>
                                    )
                                }
                            )
                        }
                    </AnimatePresence>
                </section>
                <AnimatePresence>
                    {
                        editedTask && <motion.section
                            key={editedTask.id}
                            className="absolute bottom-2 h-auto w-full"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        > 
                            <aside className="mx-3 p-2 bg-neutral-800 flex flex-col gap-2 items-center rounded-sm" onClick={(e) => e.stopPropagation() }>
                                <div className="h-full w-full flex gap-2 items-center">
                                    <Checkbox
                                        className="h-4 aspect-square"
                                        checked={editedTask.isCompleted}
                                        onChange={() => setEditedTask({...toggleCompletedTask(editedTask)})}/>
                                    <InputText 
                                        className="flex-1 h-12 content-center"
                                        value={editedTask.title}
                                        onChange={e => setEditedTask(changeTask(editedTask, { title: e.target.value }))}
                                    />
                                </div>
                                <div className="h-full w-full flex gap-2 items-center">
                                    <Button
                                        className="ml-auto hover:outline-red-600 hover:outline-1"
                                        onClick={
                                            () => deleteTaskForDb(selectedTaskId)
                                        }
                                    >
                                        删除
                                    </Button>
                                    <Button
                                        className="hover:outline-green-600 hover:outline-1"
                                        onClick={
                                            () => {
                                                if(editedTask.isCompleted !== selectedTask?.isCompleted) toggleCompletedTaskForDb(selectedTaskId)
                                                const changes: Partial<TaskEditedable> = {};
                                                if(editedTask.title !== selectedTask?.title) changes.title = editedTask.title;

                                                changeTaskForDb(selectedTaskId, changes);
                                            }
                                        }
                                    >
                                        保存
                                    </Button>
                                </div>
                            </aside>
                        </motion.section>
                    }
                </AnimatePresence>
            </main>
        </div>
    );
}