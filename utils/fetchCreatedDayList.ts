import { CreatedPlan } from "../typing";


export const fetchCreatedDayList = async (dayID:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getCreatedPlans?dayID=${dayID}`)
    const createdPlanList: CreatedPlan[] = await res.json();
    return createdPlanList;
}