import React, { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast';
import { CreatedPlanBody, DayPlan, DeleteInfo } from '../typing';
import { fetchDaysPlans } from '../utils/fetchDaysPlans';

interface Props {
  selectedID: string,
  onClose: () => void
  visible: boolean
  setDayPlans: Dispatch<SetStateAction<DayPlan[]>>,
  refreshGoals : () => Promise<void>

}

function MoreMenu({ selectedID, onClose, visible, setDayPlans, refreshGoals }: Props) {
  const [visabilityAddGoal, setVisabilityAddGoal] = useState<boolean>(false)
  const [goalInput, setGoalInput] = useState('');
  const [goalDescription, setGoalDescription] = useState('');
  const handeOnClose = (e: any) => {
    if (e.target.id === "container") onClose();
  }

  const deleteDay = async () => {

    const commentToast = toast.loading('Deleting day...')
    const deleteInformation: DeleteInfo = {
      id: selectedID,
      type: 'dayPlan',
    }

    const result = await fetch(`/api/deleteAllGoals`, {
      body: JSON.stringify(deleteInformation),
      method: 'DELETE'
    })

    const result2 = await fetch(`/api/deleteDay`, {
      body: JSON.stringify(deleteInformation),
      method: 'DELETE'
    })

    const json = await result.json();
    const newDays = await fetchDaysPlans()
    setDayPlans(newDays)
    onClose();
    toast.success('Day was deleted!', {
      id: commentToast,
    })
    return json;
  }

  const postGoal = async () => {
    const goalInfo: CreatedPlanBody = {
      planName: goalInput,
      description: goalDescription,
      state:false,
      dayPlanID:selectedID
    }

    const result = await fetch(`/api/addGoal`, {
      body: JSON.stringify(goalInfo),
      method: 'POST',
    })

    const json = await result.json();
    const newDays = await fetchDaysPlans();
    setDayPlans(newDays)
    refreshGoals()
    toast('Goal was added', { icon: '✔️' })

    onClose();
    return json;
  }

  const handleGoalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postGoal()
    setGoalInput('')
    setGoalDescription('')
  }



  if (!visible) return null;
  return (
    <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded min-w-[50%]">
        <h1 className="text-xl text-center">Control Selected day</h1>
        <div className="grid justify-items-center">
          <button onClick={deleteDay} className=" bg-red-600 h-10 w-[25%] rounded-md text-white shadow-lg cursor-pointer m-5 hover:bg-cyan-500 ">Delete day</button>
        </div>
        <div className="grid justify-items-center">
          <button onClick={() => setVisabilityAddGoal(!visabilityAddGoal)} className=" bg-green-600 rounded-md text-white shadow-lg cursor-pointer  h-10 w-[25%] hover:bg-cyan-500">Add new goal</button>
        </div>
        {visabilityAddGoal && (
          <div className="text-center mt-4 border border-sky-500 transition delay-150 ease-in-out rounded-lg ">
            <form onSubmit={handleGoalSubmit}>
              <p className="font-bold mb-2" >Goal name</p>
              <input value={goalInput} onChange={(e) => setGoalInput(e.target.value)} className="text-sm text-gray-base w-[30%] 
                              mr-3 py-5 px-4 h-3 border 
                              border-gray-200 rounded mb-2 placeholder:text-center"  placeholder='Input goal' type="text" name="goal required" />
              <p className="font-bold mb-2" >Goal description</p>
              <input value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} className="text-sm text-gray-base w-[30%] 
                              mr-3 py-5 px-4 h-3 border 
                              border-gray-200 rounded mb-2 placeholder:text-center"  placeholder='Write goal description' type="text" name="" />

              <div className="flex justify-center mb-3">
                <button disabled={goalInput === ''} className="disabled:bg-gray-100 disabled:text-black rounded-md bg-green-500 p-2 text-center w-[20%] text-white shadow-lg ">Submit</button>
                <button onClick={() => setVisabilityAddGoal(!visabilityAddGoal)} className="disabled:bg-gray-100 rounded-md bg-red-500 p-2 text-center w-[20%] text-white shadow-lg ml-2">Close</button>
              </div>
            </form>
          </div>
        )}
      </div>

    </div>
  )
}

export default MoreMenu