"use server";

import PlanManagerClient from "@/components/planManager/PlanManagerClient";
import { getAllTasksInDb } from "@/lib/service";

export default async function PlanManager() {
    const tasks = await getAllTasksInDb();

    return <PlanManagerClient tasks={tasks}/>
}