"use client"
import { getUsersByRank } from '@/redux/features/auth/authActions'
import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux'

function Page() {
  const dispatch:any=useDispatch()
  const [rank,setRank]=useState([])

  useEffect(()=>{
    const res = dispatch(getUsersByRank())
    res.then((x:any)=>{
      console.log(x)
      setRank(x?.payload)
    })
  },[])


  return (
    <div className='pt-14 ps-20'>
      
       
<div className="relative overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Rank
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          email
        </th>
        <th scope="col" className="px-6 py-3">
          Score
        </th>
      </tr>
    </thead>
    <tbody>
      {rank?.map((x:any)=>(

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={x}>
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {x?.rank}
        </th>
        <td className="px-6 py-4">
          {x?.fullName}
        </td>
        <td className="px-6 py-4">
        {x?.email}
        </td>
        <td className="px-6 py-4">
          {x?.score}
        </td>
      </tr>
        ))}
      
    </tbody>
  </table>
</div>

    </div>
  )
}

export default Page