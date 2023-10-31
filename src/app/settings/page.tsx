"use client"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { getOpponentsDetails, getUser, getfrndDetails, searchUser } from '@/redux/features/auth/authActions'
import Add from '@/Components/settings/Add'

function Page() {
  const { user } = useSelector((state: any) => state.auth)
  const [search, setSearch] = useState<any>("")
  const [add, setAdd] = useState<any>()
  const [frnds, setFrnds] = useState<any>([])
  const route = useRouter()
  const dispatch: any = useDispatch()
  useEffect(() => {
    setFrnds(user?.frnd)
  }, [user])

  useEffect(() => {
    setAdd(user?.frnds || [])
  }, [frnds])
  return (
    <div className='pt-14 ps-20 flex'>

      <div className='w-1/2  rounded h-[calc(100vh-5rem)] p-5'>
        <div className='flex mt-10'>
          {/* <img className="w-36 h-36  rounded-full" src={user?.pic ? user?.pic : "./no-pic.jpg"} alt="Rounded avatar" /> */}
          <div className='ms-8 self-center'>
            <h1 className='text-3xl'>{user?.fullName}</h1>
            <h2 className='mt-3'>{user?.email}</h2>
          </div>
        </div>
        <hr className='mt-10' />
        <div className='mt-10'>
          <h6>Rank : {user?.rank || 0}</h6>
          <h6>Score : {user?.score || 0}</h6>
          <h6>Played : {user?.played || 0}</h6>
          <h6>Wins : {user?.wins || 0}</h6>
        </div>
        <button
          onClick={() => {
            Cookies.remove("token")
            route.replace("/")
          }}
          className=" justify-center m-2 rounded-full bg-red-600 px-5 float-right py-1.5 text-sm font-semibold hover:bg-red-700 leading-6 text-white shadow-sm"
        >
          Log Out
        </button>
        <div>
          
        </div>
      </div>
      <div className='w-1/2 overflow-auto rounded h-[calc(100vh-5rem)] p-5'>
        <div className="relative w-72 outline-none">
          <div className="absolute inset-y-0 left-0 flex items-center outline-none pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={search}
            id="default-search"
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-12 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search"
          />
          <button
            onClick={() => {
              if (search) {

                const res = dispatch(searchUser(search))
                res.then((x: any) => {
                  console.log(x)
                  setAdd(x?.payload)
                })
              } else {
                const res = dispatch(getfrndDetails(frnds))
                res.then((x: any) => {
                  setAdd(x?.payload)
                })
              }
            }}
            className="text-white absolute text-[10px] right-2.5 bottom-[2.5px] bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-4 "
          >
            Search
          </button>
        </div>

        {add?.map((x: any) => (
          <Add email={x?.email} name={x?.fullName} rank={x?.rank} score={x?.score} key={x} id={x?._id} frnds={frnds} setAdd={() =>{
             setSearch("")
             dispatch(getUser())
            }} />
        ))}

      </div>
    </div>
  )
}

export default Page