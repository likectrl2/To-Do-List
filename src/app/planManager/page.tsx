"use client";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { addTask, deleteTask } from "@/lib/actions";
import { getAllTasksInDb } from "@/lib/service";
import { Task } from "@/type";

const tasks: Task[] = await getAllTasksInDb();

export default function planManager() {
    

    return (
        <div className="page flex flex-col">
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
                                        className="h-12 px-2 py-1 bg-neutral-800 flex gap-2 items-center">
                                            <Checkbox className="h-4 aspect-square"/>
                                            <label className="h-full content-center">{t.title}</label>
                                            <Button 
                                                className="h-full"
                                                onClick={() => deleteTask(t.id)}
                                            >
                                                D
                                            </Button>
                                        </div>
                                )
                            }
                        )
                    }
                </section>
            </main>
        </div>
    );
}