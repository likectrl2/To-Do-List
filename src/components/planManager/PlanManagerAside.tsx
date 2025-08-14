"use client";

import { Task, toggleCompletedTask } from '@/type/plan';
import { AnimatePresence, motion } from 'framer-motion';
import InputText from '../common/InputText';
import Checkbox from '../common/Checkbox';
import Button from '../common/Button';
import { changeTaskForDb, toggleCompletedTaskForDb } from '@/lib/actions';
import { cn } from '@/lib/utils';

interface PlanManagerAsidePara {
    editedTask: Task | undefined
    setEditedTask: (newTask: Task) => void
    selectedTask: Task
}

export default function PlanManagerAside({editedTask, setEditedTask, selectedTask}: PlanManagerAsidePara) {
    const handleChange = () => {
        if(editedTask?.isCompleted !== selectedTask!.isCompleted) toggleCompletedTaskForDb(selectedTask!.id);
        changeTaskForDb(selectedTask!.id, { title: editedTask?.title });
    }
    
    return (
        <AnimatePresence mode="wait">
            {
                editedTask &&
                <motion.aside
                    key={editedTask.id}
                    className={cn(
                        "bg-neutral-800 p-3 rounded-t-sm",
                        "flex flex-col gap-0.5"
                    )}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 800, damping: 60 }}
                >
                    <div className='pt-1.5   flex items-center gap-1.5'>
                        <Checkbox 
                            className='h-4'
                            checked={editedTask.isCompleted}
                            onChange={async () => setEditedTask(await toggleCompletedTask(editedTask))}
                        />
                        <InputText
                            autoFocus
                            className='w-full   hover:bg-neutral-700 focus:bg-neutral-700 rounded-sm p-1'
                            defaultValue={editedTask.title}
                            onChange={e => setEditedTask({...editedTask, title: e.target.value})}/>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <Button
                            className='ml-auto'
                            onClick={handleChange}
                        >
                            修改
                        </Button>
                    </div>
                </motion.aside>
            }
        </AnimatePresence>
    )
}