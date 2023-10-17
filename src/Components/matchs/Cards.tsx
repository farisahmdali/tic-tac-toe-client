import React from 'react'

function Cards({val}:{val:{type:string,description:string,limit:number,date:string,time:string,head:string,joined:any,viewer:number|null,view:boolean|null}}) {
    console.log(val);
    
  return (
    <div  className='w-[200px] min-h-[250px] pe-2 pt-2 ps-2 float-left ms-8 mt-5 rounded-[20px] bg-gradient-to-br flex flex-col to-[#4F46E5] from-[#3C3E4C] '>
        <h1 className='underline '>{val?.head}</h1>
        <h1 className='flex text-xs justify-between'>Description: <p>{val?.description}</p></h1>
        <h1 className='flex text-xs justify-between'>Type : <p>{val?.type}</p></h1>
        <h1 className='flex text-xs justify-between'>Max Player : <p>{val?.limit}</p></h1>
        {val?.date ? <><h1 className='flex text-xs mt-5'>Date : <p>{val?.date}</p></h1>
        <h1 className='flex text-xs '>Time : <p>{val?.time}</p></h1></> : <h1 className='flex text-xs mt-5 text-yellow-500 '>Quick Play</h1>}
        <h1 className='flex text-xs mt-5'>Players Joined : <p>{val?.joined?.length || 0}</p></h1>
        <h1 className='flex text-xs '>viewer : <p>{val?.viewer || 0}</p></h1>
        <div className='flex justify-center items-center mt-10'>
            {val?.view ? 
        <button
          className=" justify-center m-2 rounded-full bg-indigo-600 px-4  text-sm border leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View
        </button>
            :null}
        <button
          className=" justify-center m-2 rounded-full bg-indigo-600 px-4  text-sm border leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Join
        </button>
        </div>

    </div>
  )
}

export default Cards