"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { addTask, changeTask, deleteTask, toggleCompletedTask } from '@/lib/actions';
import { Task } from "@/type";
import { useEffect, useMemo, useState } from "react";
import InputText from "../common/InputText";

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

    return (
        <div className="page flex flex-col relative">
            <div className="h-9 flex">
                <div className="flex-1"/>
                <Button className="h-full" onClick={addTask}>+</Button>
            </div>
            <main className="flex-1">
                <section className="px-3 flex flex-col">
                    {
                        tasks.map(
                            t => {
                                return (
                                    <div 
                                        key={t.id}
                                        className="h-12 px-2 py-1 bg-neutral-800 flex gap-2 items-center"
                                        onClick={() => setSelectedTaskId(t.id)}
                                    >
                                        <label className="h-full content-center">{t.title}</label>
                                        <Button 
                                            className="h-full ml-auto"
                                            onClick={e => { e.stopPropagation(); deleteTask(t.id); }}
                                        >
                                            D
                                        </Button>
                                    </div>
                                )
                            }
                        )
                    }
                </section>
                {
                    editedTask && <section className="absolute bottom-2 h-auto w-full"> 
                        <aside className="mx-2 p-2 bg-neutral-800 flex flex-col gap-2 items-center">
                            <div className="h-full w-full flex gap-2 items-center">
                                <Checkbox
                                    className="h-4 aspect-square"
                                    checked={editedTask.isCompleted}
                                    onChange={e => setEditedTask({...editedTask, isCompleted: e.target.checked})}/>
                                <InputText 
                                    className="h-12 content-center"
                                    value={editedTask.title}
                                    onChange={e => setEditedTask({...editedTask, title: e.target.value})}
                                />
                            </div>
                            <div className="h-full w-full flex items-center">
                                <Button
                                    className="ml-auto"
                                    onClick={
                                        () => {
                                            changeTask(selectedTaskId, { title: editedTask.title });
                                            if(selectedTask?.isCompleted !== editedTask.isCompleted) toggleCompletedTask(selectedTaskId);
                                        }
                                    }
                                >
                                    保存
                                </Button>
                            </div>
                        </aside>
                    </section>
                }
            </main>
        </div>
    );
}