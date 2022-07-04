import React, { Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast';
import { DayPlan, DayPlanBody } from '../typing';
import { fetchDaysPlans } from '../utils/fetchDaysPlans';

interface Props {
    visible: boolean,
    onClose: () => void
    setDayPlans: Dispatch<SetStateAction<DayPlan[]>>
}

function DataInputs({ visible, onClose, setDayPlans }: Props) {
    const handeOnClose = (e: any) => {
        if (e.target.id === "container") onClose();
    }
    if (!visible) return null;

    const [dateInput, setDateInput] = useState('');
    const [goalInput, setGoalInput] = useState('');

    const postDay = async () => {
        const dayPlanInfo: DayPlanBody = {
            goalDescription: goalInput,
            selectedDate: dateInput,
        }
        console.log(JSON.stringify(dayPlanInfo))
        const result = await fetch(`/api/addDay`, {
            body: JSON.stringify(dayPlanInfo),
            method: 'POST',
        })

        const json = await result.json();
        const newDays = await fetchDaysPlans();
        setDayPlans(newDays)

        toast('New Day is created', { icon: '✔️' })

        onClose();
        return json;

    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postDay()
        setDateInput('')
        setGoalInput('')
    }

    return (
        <div onClick={handeOnClose} id="container" className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-2 rounded min-w-[50%]">
                <h1 className="text-xl text-center mb-3">Add info about new day</h1>
                <form onSubmit={handleSubmit}>
                    <h2 className="font-bold text-center">End date</h2>
                    <input value={dateInput} onChange={(e) => setDateInput(e.target.value)} className="text-sm text-gray-base w-full 
                              mr-3 py-5 px-4 h-3 border 
                              border-gray-200 rounded mb-2"  placeholder='Input date' type="date" name="goal required" />
                    <h2 className="font-bold text-center">Main goal</h2>
                    <input value={goalInput} onChange={(e) => setGoalInput(e.target.value)} className="text-sm text-gray-base w-full 
                              mr-3 py-5 px-4 h-3 border 
                              border-gray-200 rounded mb-2"  placeholder='Goal' type="text" name="goal required" />
                    <div className="flex justify-center">
                        <button disabled={goalInput === "" || dateInput === ""} className=" disabled:bg-gray-100 rounded-md bg-green-500 p-2 text-center w-[30%]">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DataInputs