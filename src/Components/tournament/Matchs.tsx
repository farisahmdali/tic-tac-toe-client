"use client"
import { getOpponentsDetails } from "@/redux/features/auth/authActions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Player4({ id }: { id: string }) {
    const { socket, user } = useSelector((state: any) => state?.auth)
    const [time, setTime] = useState(10);
    const [state, setState] = useState(false);
    const dispatch: any = useDispatch()
    const router = useRouter()
    const [opponent, setOpponent] = useState<any>()
    const [matchs, setMatchs] = useState<any>([])

    useEffect(() => {
        if (time > 0) {
            const interval = setInterval(() => setTime(time - 1), 1000)
            return () => clearInterval(interval)
        } else {
            router.replace("/tournament/start/"+id)
            setTime(10)
        }
    }, [id, router, time])
    useEffect(() => {
        socket.emit("get-matchs-tournament", {}, (data: any) => {
            if (data) {
                setMatchs(data)
                console.log(data)
                for (let i = 0; i < data?.length; i++) {
                    if (data[i][0].email === user.email) {
                        let res = dispatch(getOpponentsDetails(data[i][0].email))
                        res.then((res: any) => {
                            console.log(res)
                            setOpponent(res?.payload)
                            socket.emit("start-tournament")
                        })
                        break
                    } else if (data[i][1].email === user.email) {
                        let res = dispatch(getOpponentsDetails(data[i][1].email))
                        res.then((res: any) => {
                            console.log(res)
                            setOpponent(res?.payload)
                            socket.emit("start-tournament")
                        })
                        break
                    }
                }
            } else {
                window.history.back()
            }
        })
    }, [socket])

    



    return (<div className="w-[100vw] h-screen flex flex-col justify-center items-center">
            {state ? <button className="bg-indigo-700 px-6 py-3 text-sm absolute top-2 right-2 rounded" onClick={()=>setState(!state)}>Your Match</button>:<button className="bg-indigo-700 px-6 py-3 text-sm absolute top-2 right-2 rounded" onClick={()=>setState(!state)}>Tournament Matchs</button>}
        {state ? <div>
            <button className="bg-indigo-700 px-6 py-3 text-sm absolute top-2 left-2 rounded">{time}</button>
            {matchs?.map((x: any) => (
                <div className="w-[500px] flex justify-between items-center" key={x}>
                <div className="bg-indigo-700 px-6 py-3  rounded">
                    <h1>{x[0]?.fullName}</h1>
                </div>
                <h1>VS</h1>
                <div className="bg-indigo-700 px-6 py-3  rounded">
                    <h1>{x[1]?.fullName}</h1>
                </div>
            </div>
            ))}
        </div> :
            <div className="border w-[500px] h-[400px] rounded-xl">
                <div className="flex">
                    <div className="w-1/2 h-[250px] border-r border-b p-5">
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
                    <div className="w-1/2 h-[250px]  border-b p-5">
                        <h2 className='text-xl'>You</h2>
                        <h6 className='text-xs mt-7'>Rank : {user?.rank || 0}</h6>
                        <h6 className='text-xs'>Score : {user?.score || 0}</h6>
                        <h6 className='text-xs'>Tournament Won : {user?.tournamentWon || 0}</h6>
                        <h6 className='text-xs'>Tournament Played : {user?.tournamentPlayed || 0}</h6>
                        <h6 className='text-xs'>Total Matchs Played : {user?.played || 0}</h6>
                        <h6 className='text-xs'>Total Matchs Won : {user?.wins || 0}</h6>
                    </div>
                </div>
                <div className="flex justify-end items-end w-full h-[150px] p-5">
                    <h1>{time}</h1>
                </div>
            </div>
        }
    </div>);
}

export default Player4;
