import React, { useState } from 'react'
import { CreatedPlan, DeleteInfo, NewGoalState } from '../typing'
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import toast from 'react-hot-toast';
import GoalEdit from './GoalEdit';


interface Props {
  singleGoal: CreatedPlan,
  refreshGoals: () => Promise<void>

}



function SinglePlan({ singleGoal, refreshGoals }: Props) {
  const [booleanCompletion, setBooleanCompletion] = useState<boolean>(singleGoal.state)
  const [editVisability, setEditVisability] = useState<boolean>(false)
  const handleOnClose = () => setEditVisability(false)
  const deleteOneGoal = async () => {

    const deleteGoal = toast.loading('Deleting goal...')
    const deleteInformation: DeleteInfo = {
      id: singleGoal._id,
      type: 'createdPlan',
    }

    const result = await fetch(`/api/deleteSingleGoal`, {
      body: JSON.stringify(deleteInformation),
      method: 'DELETE'
    })

    const json = await result.json();
    //const newDays = await fetchDaysPlans()
    //setDayPlans(newDays)
    //onClose();
    refreshGoals()
    toast.success('Goal was deleted!', {
      id: deleteGoal,
    })
    return json;
  }

  const updateStateOfGoal = async () => {
    setBooleanCompletion(booleanCompletion => !booleanCompletion)
    const goalState: NewGoalState = {
      id: singleGoal._id,
      state: !booleanCompletion
    }
    const result = await fetch(`/api/patchGoalState`, {
      body: JSON.stringify(goalState),
      method: 'POST'
    })
    const json = await result.json();
    return json;
  }

  return (
    <div>
      <div className='mt-2'>
        <span>{singleGoal.planName}</span>
        <span onClick={deleteOneGoal} className=" transition ease-in-out delay-150 float-right m-1 hover:bg-red-500 hover:rounded-lg rounded-lg"><AiOutlineClose /></span>
        <span onClick={()=>setEditVisability(!editVisability)} className=" transition ease-in-out delay-150 float-right m-1 hover:bg-blue-500 hover:rounded-lg rounded-lg"><AiOutlineEdit /></span>
        <span className='float-right'>
          <input onClick={updateStateOfGoal} type="checkbox" className="toggle toggle-accent" checked={booleanCompletion} onChange={e => { }} />
        </span>
      </div>

      {editVisability && (
        <div>
          <GoalEdit singleGoal={singleGoal} onClose={handleOnClose} refreshGoals={refreshGoals}/>
        </div>
      )}

    </div>
  )
}

export default SinglePlan