"use client"
import React from 'react'

function Page({ params }: { params: { room: string } }) {
  return (
    <div className='flex w-screen h-screen justify-center'>
       <div className='flex flex-wrap self-center w-[600px]'>
        <div className='border w-1/2 p-5 rounded-[20px_0px_0px_0px]'>
            <h2 className='text-xl'>Player</h2>

            <h6 className='text-xs mt-7'>Rank : 112</h6>
            <h6 className='text-xs'>Score : 165</h6>
            <h6 className='text-xs'>Tournament Won : 5</h6>
            <h6 className='text-xs'>Tournament Played : 5</h6>
            <h6 className='text-xs'>Total Matchs Played : 28</h6>
            <h6 className='text-xs'>Total Matchs Won : 26</h6>

        </div>
        <div className='border w-1/2 rounded-[0px_20px_0px_0px] p-5'>
            <h2 className='text-xl'>You</h2>

            <h6 className='text-xs mt-7'>Rank : 112</h6>
            <h6 className='text-xs'>Score : 165</h6>
            <h6 className='text-xs'>Tournament Won : 5</h6>
            <h6 className='text-xs'>Tournament Played : 5</h6>
            <h6 className='text-xs'>Total Matchs Played : 28</h6>
            <h6 className='text-xs'>Total Matchs Won : 26</h6>

        </div>
        <div className='border w-full rounded-[0px_0px_20px_20px]'>
          <h1 className='text-center mt-5'>ROOM NO : {params.room}</h1>

          <button
          className=" justify-center m-2 rounded-full bg-indigo-600 px-5 float-right py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Start {">"}
        </button>
        </div>
        
       </div>
    </div>
  )
}

export default Page