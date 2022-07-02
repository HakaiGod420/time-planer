// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DayPlanBody } from '../../typing'

type Data = {
 checkMessage: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: DayPlanBody = JSON.parse(req.body)
  
  const mutations = {
    mutations:[
        {
            create: {
                _type: 'dayPlan',
                goalDescription: data.goalDescription,
                selectedDate: data.selectedDate,
            }
        }
    ]
}
const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
  const result = await fetch(apiEndpoint,{
      headers:{
          'content-type':'application/json',
          Authorization : `Bearer ${process.env.SANITY_API_TOKEN}`
      },
      body: JSON.stringify(mutations),
      method: 'POST'
  })
  const json = await result.json();
  res.status(200).json({ checkMessage: 'Succsess added' })
}
