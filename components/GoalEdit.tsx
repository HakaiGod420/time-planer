import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { CreatedPlan } from '../typing'

interface Props {
  singleGoal: CreatedPlan
  onClose: () => void
  refreshGoals: () => Promise<void>
}

function GoalEdit({ singleGoal, onClose, refreshGoals }: Props) {
  const [goalInput, setGoalInput] = useState(singleGoal.planName);
  const [goalDescription, setGoalDescription] = useState(singleGoal.description);
  const [disable, setDisable] = useState(false);
  const handeOnClose = (e: any) => {
    if (e.target.id === "container") onClose();
  }


  const updateGoal = async () => {
    let _singleGoal = singleGoal
    _singleGoal.planName = goalInput
    _singleGoal.description = goalDescription
    const result = await fetch(`/api/patchGoal`, {
      body: JSON.stringify(_singleGoal),
      method: 'POST'
    })
    const json = await result.json();
    refreshGoals()
    return json;
  }

  const hangdleGoalEdit = (e: React.FormEvent<HTMLFormElement>) => {
    const editGoal = toast.loading('Editing goal...')
    e.preventDefault();
    setDisable(true)
    updateGoal()
    onClose()
    toast.success('Goal was edited!', {
      id: editGoal,
    })  
  }
  return (
    <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded min-w-[50%]">
        <h1 className="text-xl text-center">Edit goal</h1>
        <div className="text-center mt-4 border border-sky-500 transition delay-150 ease-in-out rounded-lg ">
          <form onSubmit={hangdleGoalEdit}>
            <p className="font-bold mb-2" >Goal name</p>
            <input value={goalInput} onChange={(e) => setGoalInput(e.target.value)} className="text-sm text-gray-base w-[30%] 
                              mr-3 py-5 px-4 h-3 border 
                              border-gray-200 rounded mb-2 placeholder:text-center"  placeholder='Input goal' type="text" name="goal required" />
            <p className="font-bold mb-2" >Goal description</p>
            <input value={goalDescription} onChange={(e) => setGoalDescription(e.target.value)} className="text-sm text-gray-base w-[30%] 
                              mr-3 py-5 px-4 h-3 border 
                              border-gray-200 rounded mb-2 placeholder:text-center"  placeholder='Write goal description' type="text" name="" />

            <div className="flex justify-center mb-3">
              <button disabled={disable} className="disabled:bg-gray-100 disabled:text-black rounded-md bg-green-500 p-2 text-center w-[20%] text-white shadow-lg ">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GoalEdit