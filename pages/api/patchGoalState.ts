// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NewGoalState } from '../../typing'

type Data = {
    checkMessage: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const selectedData: NewGoalState = JSON.parse(req.body)

    const mutations = {
        mutations: [
            {
                patch: {
                    id:selectedData.id,
                    set:{
                        state:selectedData.state
                    },
                }
            }
        ]
    }

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`
    const result = await fetch(apiEndpoint, {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`
        },
        body: JSON.stringify(mutations),
        method: 'post'
    })
    const json = await result.json();

    res.status(200).json({ checkMessage: 'Succsessfully updated state' })
}
