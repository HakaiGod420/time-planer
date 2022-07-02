import { DayPlan } from "../typing";

export const fetchDaysPlans = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getDayPlan`)
    const data = await res.json();
    const dayPlans: DayPlan[] = data.dayPlans;
    return dayPlans;
}