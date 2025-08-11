"use client";

import Button from '@/components/common/Button';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type PlanManagerToolbarPara = HTMLAttributes<HTMLDivElement>

export default function PlanManagerToolbar({className}: PlanManagerToolbarPara) {
    return (
        <div 
            className={cn("bg-neutral-900 border-b-1 border-neutral-700", className)}
        >
            <span className="h-full ml-auto p-1">
                <Button className="h-full aspect-square">
                    +
                </Button>
            </span>
        </div>
    )
}