"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { useEffect, useMemo, useState } from "react";
import InputText from "../common/InputText";
import { Task, TaskEditedable, toggleCompletedTask } from "@/type/plan";
import { addTaskForDb, changeTaskForDb, deleteTaskForDb, toggleCompletedTaskForDb } from "@/lib/actions";
import { changeTask } from '../../type/plan';

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
            <div className="h-9 flex">
                <div className="flex-1"/>
                <Button className="h-full" onClick={() => handleAddTask()}>+</Button>
            </div>
            <main className="flex-1">
                <section className="px-3 flex flex-col">
                    {
                        tasks.map(
                            t => {
                                return (
                                    <div 
                                        key={t.id}
                                        className={`${"h-12 px-2 py-1 flex gap-2 items-center hover:bg-neutral-700"} ${t.isCompleted ? "opacity-50" : ""} ${t.id === selectedTaskId ? "bg-neutral-700" : "bg-neutral-800"}`}
                                        onClick={() => setSelectedTaskId(t.id)}
                                    >
                                        <label className={`${"h-full content-center"} ${t.isCompleted ? "line-through" : ""}`}>{t.title}</label>
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
                    </section>
                }
            </main>
        </div>
    );
}