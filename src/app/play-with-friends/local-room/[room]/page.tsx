"use client"
import ToasterWithAction, { toastAction } from '@/Components/Toaster/ToasterWithAction'
import Challengecard from '@/Components/play-with-friends/Challengecard'
import { getOpponentsDetails } from '@/redux/features/auth/authActions'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Page({ params }: { params: { room: string } }) {

  const { socket, user } = useSelector((state: any) => state.auth)
  const dispatch: any = useDispatch()
  const [opponent, setOpponent] = useState<any>()
  const [joined,setJoined]=useState(false)
  const route = useRouter()

  //socket function ******************************************
  const joinLocalRoom = useCallback((data: any) => {
    let res = dispatch(getOpponentsDetails(data.user))
    res.then((res: any) => {
      setOpponent(res?.payload)
    })
    socket.emit("sendEmail", { room: params.room, user: user?.email })

  }, [])

  const sendEmail = useCallback((data: any) => {
    let res = dispatch(getOpponentsDetails(data.user))
    res.then((res: any) => {
      setOpponent(res?.payload)
    })

  }, [])




  //useEffects
  useEffect(() => {
    if(!joined && user){
      socket.emit("join-local-room", { room: params.room, user: user?.email })
      setJoined(true)
    }
  }, [params.room, socket, user])

  useEffect(() => {
    socket.on("join-local-room", joinLocalRoom)
    socket.on("sendEmail", sendEmail)
    socket.on("user-quit", () => {
      toastAction.showToast("You Won This match", "green", () => route.replace("/dashboard"), "return")
    })
    return () => {
      socket.off("join-local-room", joinLocalRoom)
      socket.off("sendEmail", sendEmail)
      socket.off("user-quit", () => {
        toastAction.showToast("You Won This match", "green", () => route.replace("/dashboard"), "return")
      })
    }
  }, [joinLocalRoom, route, sendEmail, socket])

  return (
    <div className='flex w-screen h-screen justify-around p-5'>

      <ToasterWithAction />
      <button
        onClick={() => {
          route.replace("/dashboard")
        }}
        className="fixed left-3 top-2 justify-center m-2 rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-house" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" /> <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" /> </svg>
      </button>
      {<div className='flex flex-wrap self-center w-[600px]'>
        <div className='border w-1/2 p-5 rounded-[20px_0px_0px_0px]'>
          {opponent ? <>
            <h2 className='text-xl'>{opponent?.fullName}</h2>
            <h6 className='text-xs mt-7'>Rank : {opponent?.rank || 0}</h6>
            <h6 className='text-xs'>Score : {opponent?.score || 0}</h6>
            <h6 className='text-xs'>Total Matchs Played : {opponent?.played || 0}</h6>
            <h6 className='text-xs'>Total Matchs Won : {opponent?.wins || 0}</h6>
          </>
            : null}

        </div>
        <div className='border w-1/2 rounded-[0px_20px_0px_0px] p-5'>
          <h2 className='text-xl'>You</h2>
          <h6 className='text-xs mt-7'>Rank : {user?.rank || 0}</h6>
          <h6 className='text-xs'>Score : {user?.score || 0}</h6>
          <h6 className='text-xs'>Total Matchs Played : {user?.played || 0}</h6>
          <h6 className='text-xs'>Total Matchs Won : {user?.wins || 0}</h6>

        </div>
        <div className='border w-full rounded-[0px_0px_20px_20px]'>
          <h1 className='text-center mt-5'>ROOM NO : {params.room}</h1>
          {opponent?.fullName ?
            <button
              onClick={() => {
                route.replace("/play-with-friends/start/" + params.room);
              }}
              className=" justify-center m-2 rounded-full bg-indigo-600 px-5 float-right py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start {">"}
            </button>
            : <button

              className=" justify-center m-2 rounded-full bg-indigo-950 px-5 float-right py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
            >
              Start {">"}
            </button>}
        </div>

      </div>}
      {!opponent ?
        <div className='border w-[300px] p-3 h-full overflow-auto'>
          {user?.frnds?.map((x: any) => (
            <Challengecard name={x?.fullName} email={x?.email} rank={x?.rank} score={x?.score} key={x} room={params?.room} active={x?.active || false}/>
          ))}
        </div>
        : null}
    </div>
  )
}

export default Page