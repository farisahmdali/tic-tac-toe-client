import { useRouter } from 'next/navigation';
import React from 'react'

function AdminCards({ val }: { val: { _id:string ,type: string, description: string, limit: number, date: string, time: string, head: string, joined: any, viewer: number | null, view: boolean | null } }) {
  console.log(val);
  const route = useRouter()

  return (
    <div onClick={()=>{
      route.push("/tournament/"+val.type+"/"+val._id)
    }} className='w-[200px] min-h-[150px] cursor-pointer pe-2 pt-2 ps-2 float-left ms-8 mt-5 rounded-[20px] bg-gradient-to-br flex flex-col to-[#4F46E5] from-[#3C3E4C] '>
      <h1 className='underline '>{val?.head}</h1>
      <h1 className='flex text-xs justify-between'>Description: <p>{val?.description}</p></h1>
      <h1 className='flex text-xs justify-between'>Type : <p>{val?.type}</p></h1>
      <h1 className='flex text-xs mt-5'>Players Joined : <p>{val?.joined?.length || 0}</p></h1>
      <div className='flex justify-center items-center mt-10'>
      </div>

    </div>
  )
}

export default AdminCards