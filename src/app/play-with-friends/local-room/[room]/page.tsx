"use client"
import ToasterWithAction, { toastAction } from '@/Components/Toaster/ToasterWithAction'
import { getOpponentsDetails } from '@/redux/features/auth/authActions'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function Page({ params }: { params: { room: string } }) {

  const { socket, user } = useSelector((state: any) => state.auth)
  const dispatch: any = useDispatch()
  const [opponent, setOpponent] = useState<any>()
  const route = useRouter()

  //socket function ******************************************
  const joinLocalRoom = (data: any) => {
    console.log(data)
    let res = dispatch(getOpponentsDetails(data.user))
    res.then((res: any) => {
      console.log(res)
      setOpponent(res?.payload)
    })
    socket.emit("sendEmail", { room: params.room, user: user?.email })

  }

  const sendEmail = (data: any) => {
    console.log(data)
    let res = dispatch(getOpponentsDetails(data.user))
    res.then((res: any) => {
      console.log(res)
      setOpponent(res?.payload)
    })

  }




  //useEffects
  useEffect(() => {
    socket.emit("join-local-room", { room: params.room, user: user?.email })
  }, [params.room, socket, user?.email])

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
  }, [])

  return (
    <div className='flex w-screen h-screen justify-center'>
      <ToasterWithAction />
      {<div className='flex flex-wrap self-center w-[600px]'>
        <div className='border w-1/2 p-5 rounded-[20px_0px_0px_0px]'>
          {opponent ? <>
            <h2 className='text-xl'>{opponent?.fullName}</h2>
            <h6 className='text-xs mt-7'>Rank : {opponent?.rank || 0}</h6>
            <h6 className='text-xs'>Score : {opponent?.score || 0}</h6>
            <h6 className='text-xs'>Tournament Won : {opponent?.tournamentWon || 0}</h6>
            <h6 className='text-xs'>Tournament Played : {opponent?.tournamentPlayed || 0}</h6>
            <h6 className='text-xs'>Total Matchs Played : {opponent?.played || 0}</h6>
            <h6 className='text-xs'>Total Matchs Won : {opponent?.wins || 0}</h6>
          </>
            : null}

        </div>
        <div className='border w-1/2 rounded-[0px_20px_0px_0px] p-5'>
          <h2 className='text-xl'>You</h2>
          <h6 className='text-xs mt-7'>Rank : {user?.rank || 0}</h6>
          <h6 className='text-xs'>Score : {user?.score || 0}</h6>
          <h6 className='text-xs'>Tournament Won : {user?.tournamentWon || 0}</h6>
          <h6 className='text-xs'>Tournament Played : {user?.tournamentPlayed || 0}</h6>
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
    </div>
  )
}

export default Page