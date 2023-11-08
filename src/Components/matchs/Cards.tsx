import React from 'react'

function Cards({val}:{val:{tName:string,prize:number,tId:string,date:string,time:string}}) {
  return (
    <div  className='w-[200px] h-[120px] pe-2 pt-2 ps-2 float-left ms-8 mt-5 rounded-[3px] bg-gradient-to-br flex flex-col to-[#4F46E5] from-[#3C3E4C] '>
      <h1 className='text-xl underline'>{val?.tName}</h1>
      {val?.prize<3 ? <><h1 className='text-[12px] text-green-600'>You Got {val?.prize===1 ? val?.prize+"st":val?.prize+"nd"}</h1> <h1 className='text-[12px] text-green-600'>Score Earned {val?.prize===1 ? "2" : "1"}</h1></> :<><h1 className='text-[12px] text-red-600'>You Loose</h1></>}
      <h1 className='text-[12px] text-white'>Date : {val?.date}</h1>
      <h1 className='text-[12px] text-white'>Time : {val?.time}</h1>

    </div>
  )
}

export default Cards