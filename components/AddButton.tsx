import React, { Dispatch, SetStateAction, useState } from 'react'
import { IoAddCircleSharp } from 'react-icons/io5'
import { DayPlan } from '../typing'
import DataInputs from './DataInputs'

interface Props{
  setDayPlans: Dispatch<SetStateAction<DayPlan[]>>
}
function AddButton({setDayPlans}:Props) {
  const [inputFieldsVisable, setInputFieldsVisability] = useState<boolean>(false)
  const handleOnClose = () =>setInputFieldsVisability(false)
  return (
    <div>
      <div onClick={()=>setInputFieldsVisability(!inputFieldsVisable)} className="flex justify-center cursor-pointer">
        <IoAddCircleSharp className="h-10 w-10 mr-1" />
        <p className='text-xl mt-1'>Add new day</p>
      </div>
    {inputFieldsVisable && (
      <DataInputs setDayPlans={setDayPlans} onClose={handleOnClose} visible={inputFieldsVisable}/>
    )}
    </div>
  )
}

export default AddButton