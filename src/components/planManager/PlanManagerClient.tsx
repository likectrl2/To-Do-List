"use client";

import { Task } from "@/type/plan";
import PlanManagerToolbar from "./PlanManagerToolbar";

interface PlanManagerClientPara {
    tasks: Task[];
}

export default function PlanManagerClient({tasks}: PlanManagerClientPara) {    
    return (
        <div className="flex flex-col">
            <PlanManagerToolbar className="h-9 w-full flex absolute top-0 right-0"/>
            <div className="flex-1 mt-9"/>
        </div>
    );
}