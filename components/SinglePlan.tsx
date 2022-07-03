import React from 'react'
import { CreatedPlan } from '../typing'


interface Props{
    singleGoal : CreatedPlan
}

function SinglePlan({singleGoal}:Props) {
  return (
    <div>
        <div>
            <p>{singleGoal.planName}</p>
        </div>
    </div>
  )
}

export default SinglePlan