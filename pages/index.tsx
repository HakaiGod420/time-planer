import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import AddButton from '../components/AddButton'
import DaysList from '../components/DaysList'
import { DayPlan } from '../typing'
import { fetchDaysPlans } from '../utils/fetchDaysPlans'

interface Props {
  daysPlan: DayPlan[]
}

const Home = ({daysPlan}: Props) => {
  console.log(daysPlan)
  return (
    <div className=" bg-blue-100 h-screen">
      <Head>
        <title>Time planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster/>
      <main className="">
        <div className="font-bold text-2xl  pt-3 pb-5 text-center text-blue-400">
          <h1>Time planer</h1>
        </div>
          <DaysList dayPlan={daysPlan}/>
      </main>
      <footer className="text-center text-black">
        <p>Made by <span className="font-bold">HakaiGod</span></p>
      </footer>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const daysPlan = await fetchDaysPlans();
  return {
    props:{
      daysPlan
    }
  }
}
