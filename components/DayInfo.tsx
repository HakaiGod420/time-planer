import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CreatedPlan, DayPlan } from '../typing'
import { MdMoreHoriz } from "react-icons/md";
import MoreMenu from './MoreMenu';
import SinglePlan from './SinglePlan';
import { fetchCreatedDayList } from '../utils/fetchCreatedDayList';
interface Props{
    dayPlan:DayPlan,
    setDaysPlan:Dispatch<SetStateAction<DayPlan[]>>
}

function DayInfo({dayPlan,setDaysPlan}: Props) {
  const [moreVisability, setMoreVisability] = useState<boolean>(false)
  const [dayListPlans, setDayListPlans] = useState<CreatedPlan[]>([])

  const refreshPlanDayList = async () => {
    const dayListPlans: CreatedPlan[] = await fetchCreatedDayList(dayPlan._id)
    setDayListPlans(dayListPlans)
  }
  const handleOnClose = () =>setMoreVisability(false)
  useEffect(()=>{
    refreshPlanDayList()
  },[])
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      <div onClick={()=>setMoreVisability(!moreVisability)} className="float float-right p-2 cursor-pointer"><MdMoreHoriz/></div>
    <div className="px-6 py-4 divide-y-2">
      <div className="text-center font-bold text-xl mb-2">
        {dayPlan.selectedDate.toString()}
        </div>
      <p className="text-gray-700 text-base">
        {dayPlan.goalDescription}
      </p>
        {dayListPlans.length > 0 && (
       <div>
          {dayListPlans.map(singleGoal => (
            <SinglePlan key={singleGoal._id} singleGoal={singleGoal}/>
          ))}
      </div>
        )
      }
      {moreVisability && (
      <MoreMenu setDayPlans={setDaysPlan} selectedID={dayPlan._id} onClose={handleOnClose} visible={moreVisability} />
    )}
    </div>
  </div>
  )
}

export default DayInfo