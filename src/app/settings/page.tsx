"use client"
import React from 'react'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

function Page() {
  const { user } = useSelector((state: any) => state.auth)
  const route = useRouter()
  return (
    <div className='pt-14 ps-20'>
      <button
        onClick={() => {
          Cookies.remove("token")
          route.replace("/")
        }}
        className=" justify-center m-2 rounded-full bg-red-600 px-5 float-right py-1.5 text-sm font-semibold hover:bg-red-700 leading-6 text-white shadow-sm"
      >
        Log Out
      </button>
      <div className='w-1/2 bg-slate-500 rounded h-[calc(100vh-5rem)] p-5'>
        <div className='flex'>
          <img className="w-36 h-36  rounded-full" src={user?.pic ? user?.pic : "./no-pic.jpg"} alt="Rounded avatar" />
          <div className='ms-8 self-center'>
            <h1 className='text-3xl'>{user?.fullName}</h1>
            <h2>{user?.email}</h2>
          </div>
        </div>
        <hr className='mt-10' />
        <div className='mt-10'>
          <h6>Rank : {user?.rank || 0}</h6>
          <h6>Score : {user?.rank || 0}</h6>
          <h6>Wins : {user?.rank || 0}</h6>
          <h6>Played : {user?.rank || 0}</h6>
          <h6>Tournament Played : {user?.rank || 0}</h6>
          <h6>Tournament Won : {user?.rank || 0}</h6>
        </div>

      </div>
    </div>
  )
}

export default Page