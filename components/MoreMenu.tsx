import React, { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast';
import { DayPlan, DeleteInfo } from '../typing';
import { fetchDaysPlans } from '../utils/fetchDaysPlans';

interface Props{
  selectedID: string,
  onClose:() => void
  visible:boolean
  setDayPlans:Dispatch<SetStateAction<DayPlan[]>>

}

function MoreMenu({selectedID,onClose,visible,setDayPlans}:Props) {
  const handeOnClose = (e : any) =>{
    if(e.target.id === "container") onClose();
  }

  const deleteDay = async () => {

    const deleteInformation: DeleteInfo = {
      id:selectedID,
      type:'dayPlan',
  }

    console.log(JSON.stringify(deleteInformation));
    const result  = await fetch(`/api/deleteDay`,{
      body: JSON.stringify(deleteInformation),
      method:'DELETE'
    })
    
    const json = await result.json();
    const newDays = await fetchDaysPlans()
    setDayPlans(newDays)
    toast('Day was deleted',{icon:'✔️'})

    onClose();
    return json;
}



  if(!visible) return null;
  return (
    <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white p-2 rounded min-w-[50%]">
    <h1 className="text-xl text-center">Control Selected day</h1>
    <div className="grid justify-items-center">
      <button onClick={deleteDay} className=" bg-red-600 p-2 rounded-md text-white shadow-lg cursor-pointer m-5 ">Delete day</button>
    </div>
    </div>
</div>
  )
}

export default MoreMenu