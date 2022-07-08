import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CreatedPlan, DayPlan } from '../typing'
import { MdMoreHoriz } from "react-icons/md";
import MoreMenu from './MoreMenu';
import SinglePlan from './SinglePlan';
import { fetchCreatedDayList } from '../utils/fetchCreatedDayList';
interface Props {
  dayPlan: DayPlan,
  setDaysPlan: Dispatch<SetStateAction<DayPlan[]>>
}

function DayInfo({ dayPlan, setDaysPlan }: Props) {
  const [moreVisability, setMoreVisability] = useState<boolean>(false)
  const [dayListPlans, setDayListPlans] = useState<CreatedPlan[]>([])

  const refreshPlanDayList = async () => {
    const dayListPlans: CreatedPlan[] = await fetchCreatedDayList(dayPlan._id)
    setDayListPlans(dayListPlans)
  }
  const handleOnClose = () => setMoreVisability(false)

  useEffect(() => {
    refreshPlanDayList()
  }, [])

  return (
    <div className="rounded overflow-hidden shadow-lg bg-white">
      <div onClick={() => setMoreVisability(!moreVisability)} className="float float-right p-2 cursor-pointer"><MdMoreHoriz /></div>
      <div className="px-6 py-4 divide-y-2 text-black">
        <div className="text-center font-bold text-xl mb-2 ">
          <div>
            <p className="text-center font-bold">SELECTED DAY TO  COMPLETE GOALS</p>
          </div>
          {dayPlan.selectedDate.toString()}
        </div>
        <div>
          <p className="font-bold text-center">DESCRIPTION</p>
        </div>
        <p className="text-gray-700 text-base text-center">
          {dayPlan.goalDescription}
        </p>
        {dayListPlans.length > 0 && (
          <div>
            <div>
              <p className="font-black text-center">GOAL LIST</p>
            </div>
            {dayListPlans.map(singleGoal => (
              <SinglePlan refreshGoals={() => refreshPlanDayList()} key={singleGoal._id} singleGoal={singleGoal} />
            ))}
          </div>
        )
        }
        {dayListPlans.length == 0 &&

          (
            <div><p className="font-bold text-center mt-2 text-red-500 ">There is no plans for this day</p></div>
          )

        }
        {moreVisability && (
          <MoreMenu refreshGoals={() => refreshPlanDayList()} setDayPlans={setDaysPlan} selectedID={dayPlan._id} onClose={handleOnClose} visible={moreVisability} />
        )}
      </div>
    </div>
  )
}

export default DayInfo