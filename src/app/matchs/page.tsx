"use client"
import AdminCards from '@/Components/matchs/AdminCard'
import Cards from '@/Components/matchs/Cards'
import { getMyTournaments } from '@/redux/features/auth/authActions'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Page() {
  const dispatch: any = useDispatch()
  const [tournament, setTournament] = useState<object[] | null[]>([])
  const { user } = useSelector((state: any) => state.auth)

  useEffect(() => {
    let res = dispatch(getMyTournaments())
    res.then((res: any) => {
      console.log(res)
      setTournament(res.payload.user)
    })
  }, [dispatch])
  return (
    <div className='pt-14 ps-20 pe-5'>
      <div className='h-[calc(100vh-5rem)] w-[calc(100vw-3.5rem-400px)] p-3 float-left  border'>

        {tournament.map((x: any) => (
          x.admin !== user?._id ? <Cards val={x} key={x?._id}/> : null
        ))}
      </div>
    </div>
  )
}

export default Page