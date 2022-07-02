export interface DayPlan extends DayPlanBody{
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'dayPlan'
}
export type DayPlanBody = {
    goalDescription: string,
    selectedDate: string,
}

export type DeleteInfo = {
    id: string,
    type: string
}