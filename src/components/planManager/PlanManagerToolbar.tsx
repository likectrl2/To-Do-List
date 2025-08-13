"use client";

import Button from '@/components/common/Button';
import { addTaskForDb } from '@/lib/actions';
import { cn } from '@/lib/utils';

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
            <span className="h-full ml-auto  p-1">
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