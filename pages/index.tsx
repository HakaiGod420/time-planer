import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import DaysList from '../components/DaysList'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

import { DayPlan } from '../typing'
import { fetchDaysPlans } from '../utils/fetchDaysPlans'

interface Props {
  daysPlan: DayPlan[]
}

const Home = ({ daysPlan }: Props) => {
  console.log(daysPlan)
  return (
    <div className=" bg-slate-300 h-screen">
      <Head>
        <title>Time planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="">
        <div>
          <Navbar />
          <DaysList dayPlan={daysPlan} />
        </div>

      </main>
      <Footer/>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const daysPlan = await fetchDaysPlans();
  return {
    props: {
      daysPlan
    }
  }
}
