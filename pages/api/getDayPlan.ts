// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DayPlan } from '../../typing'
import {sanityClient} from '../../sanity'
import {groq} from 'next-sanity'

const feedQuery = groq `
*[_type=="dayPlan"] | order(_createdAt desc)
`

type Data = {
  dayPlans: DayPlan
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
  const dayPlans:DayPlan = await sanityClient.fetch(feedQuery)
  res.status(200).json({ dayPlans })
}
