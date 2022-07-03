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


export interface CreatedPlan extends CreatedPlanBody{
    _id: string
    _createdAt: string
    _updatedAt: string
    _rev: string
    _type: 'createdPlan'
    dayPlan:{
        _ref:string,
        _type:'reference'
    }
}

export type CreatedPlanBody = {
    planName: string
    description: string
    state: boolean
}

export type DeleteInfo = {
    id: string,
    type: string
}
