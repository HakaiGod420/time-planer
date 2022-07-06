import React, { useState } from 'react'
import { DayPlan } from '../typing'
import AddButton from './AddButton'
import DayInfo from './DayInfo'


interface Props{
    dayPlan:DayPlan[]
}

function DaysList({dayPlan:dayPlanProp}:Props) {
  const [dayPlan, setDayPlans] = useState<DayPlan[]>(dayPlanProp)
  return (
    <div className='mt-3'>
      <AddButton setDayPlans={setDayPlans} />
       <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {dayPlan.map(dayPlan => (
            <DayInfo setDaysPlan={setDayPlans} key={dayPlan._id} dayPlan={dayPlan}/>
          ))}
    </div>
    </div>
   
  )
}

export default DaysList