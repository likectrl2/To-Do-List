"use client";

import Button from '@/components/common/Button';
import { addTaskForDb } from '@/lib/actions';
import { cn } from '@/lib/utils';
import InputText from '../common/InputText';

interface PlanManagerToolbarPara {
    className: string
    setSelectedId: (id: string) => void
}

export default function PlanManagerToolbar({className, setSelectedId}: PlanManagerToolbarPara) {
    return (
        <div 
            className={cn(
                "bg-neutral-950 border-b-1 border-neutral-700   flex",
                className
            )}
        >
            <InputText className='h-full flex-1   bg-inherit px-2' placeholder="键入以搜索"/>
            <span className="h-full   p-1">
                <Button 
                    className="h-full   aspect-square"
                    onClick={
                        async () => {
                            setSelectedId((await addTaskForDb()).id);
                        }
                    }
                >
                    +
                </Button>
            </span>
        </div>
    )
}