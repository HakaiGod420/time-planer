import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import toast from 'react-hot-toast';
import { CreatedPlanBody, DayPlan, DayPlanBody } from '../typing';
import { fetchDaysPlans } from '../utils/fetchDaysPlans';
import { v4 as uuidv4 } from 'uuid';

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
    const [inputList, setInputList] = useState<CreatedPlanBody[]>([
        {
            planName: "",
            description: "",
            state: false,
            dayPlanID: uuidv4()
        },])

    const addMemberRow = () => {
        let _inputList = [...inputList]
        let tempData: CreatedPlanBody = {
            planName: "",
            description: "",
            state: false,
            dayPlanID: uuidv4()
        }
        if (inputList.length <= 6) {
            _inputList.push(tempData)
            setInputList(_inputList)
        } else {
            alert("You cannot add more")
        }
    }

    const removeMemberRow = (id: string) => {
        let _inputList = inputList.filter(member => member.dayPlanID !== id)
        if (inputList.length > 1) {
            setInputList(_inputList)
        }
    }

    const handleMemberChange = (
        id: string,
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const index = inputList.findIndex(m => m.dayPlanID === id)
        let _inputList = [...inputList] as any
        _inputList[index][event.target.name] = event.target.value

        setInputList(_inputList)
    }


    const postGoal = async (goalInfo:CreatedPlanBody) => {
  
        const result = await fetch(`/api/addGoal`, {
          body: JSON.stringify(goalInfo),
          method: 'POST',
        })
    
        const json = await result.json();
        return json;
      }

    const postDay = async () => {
        const addDay = toast.loading('Creating day...')
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

        for (var i = 0; i < inputList.length; i++) {

            if (inputList[i].planName != '') {
                inputList[i].dayPlanID = json.id
                console.log(inputList[i])
                await postGoal(inputList[i])
            }
        }

        const newDays = await fetchDaysPlans();
        setDayPlans(newDays)

        toast.success('Day was added!', {
            id: addDay,
        })

        onClose();
        console.log(json)
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

                    <h2 className="font-bold text-center">Goals List</h2>
                    {inputList.map(member => (
                        <div className="flex items-stretch mt-2 justify-center p-1" key={member.dayPlanID}>
                            <input className="text-sm text-gray-base w-[40%] mr-3 py-5 px-4 h-3 border border-gray-200 rounded mb-2" placeholder='Input Goal' type="text" name='planName' onChange={(e) => handleMemberChange(member.dayPlanID, e)} />
                            <input className="text-sm text-gray-base w-[40%] mr-3 py-5 px-4 h-3 border border-gray-200 rounded mb-2" placeholder='Input Goal Description' name='description' onChange={(e) => handleMemberChange(member.dayPlanID, e)} type="text" />
                            <button onClick={() => removeMemberRow(member.dayPlanID)} type='button' className=" disabled:bg-gray-100 bg-red-500 p-2 text-center rounded-full w-10 h-10 mr-2">-</button>
                            <button onClick={addMemberRow} type='button' className=" disabled:bg-gray-100 bg-green-500 p-2 text-center rounded-full w-10 h-10 ">+</button>
                        </div>
                    ))}

                    <div className="flex justify-center">
                        <button disabled={goalInput === "" || dateInput === ""} className=" disabled:bg-gray-100 rounded-md bg-green-500 p-2 text-center w-[30%]">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DataInputs

