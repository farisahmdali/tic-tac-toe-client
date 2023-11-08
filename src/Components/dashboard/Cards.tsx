import React from 'react'

function Cards({ val, handleClick, handleClickPlay }: { val: { type: string,amount:number|null, description: string, limit: number, date: string, time: string, head: string, joined: any, viewer: number | null, view: boolean | null }, handleClick: () => void, handleClickPlay: () => void }) {

  return (
    <div className='w-[200px] min-h-[150px] pe-2 pt-2 ps-2 float-left justify-between ms-8 mt-5 rounded-[20px] bg-gradient-to-br flex flex-col to-[#4F46E5] from-[#3C3E4C] '>
      <div>

      <h1 className='underline '>{val?.head}</h1>
      <h1 className='flex text-xs justify-between text-black'>Description: <p className='text-white'>{val?.description}</p></h1>
      <h1 className='flex text-xs justify-between text-black'>Amount: <p className='text-white'>{val?.amount || 0}</p></h1>
      <h1 className='flex text-xs justify-between text-black'>Type : <p className='text-white'>{val?.type}</p></h1>
      

      <h1 className='flex text-xs mt-5 text-black'>Players Joined : <p className='text-white ms-2'>{val?.joined?.length || 0}</p></h1>
      </div>
      <div className='flex justify-center items-center mt-10'>
         <button
            onClick={handleClickPlay}
            className=" justify-center m-2 rounded-full bg-indigo-600 px-4  text-sm border leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Play
          </button>
      </div>

    </div>
  )
}

export default Cards