"use server";

import { getAllTasksInDb } from "@/lib/service";
import PlanManagerClient from '../../components/planManager/PlanManagerClient';

export default async function PlanManager() {
    const tasks = await getAllTasksInDb();

    return <PlanManagerClient tasks={tasks}/>
}