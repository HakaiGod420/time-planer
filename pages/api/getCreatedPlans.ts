// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreatedPlan, DayPlan } from '../../typing'
import {sanityClient} from '../../sanity'
import {groq} from 'next-sanity'

const commentQuery = groq `
*[_type == 'createdPlan' && references(*[_type == 'dayPlan' && _id==$dayID]._id)]{
  _id,
  ...
} | order(_createdAt desc)
`

type Data = CreatedPlan[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
  console.log('Request');
  const  {dayID} = req.query;
  const createdPlansList:CreatedPlan[] = await sanityClient.fetch(commentQuery,{dayID:dayID})
  res.status(200).json(createdPlansList)
}
