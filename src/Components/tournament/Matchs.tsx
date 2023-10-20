"use client"
import { getOpponentsDetails, getTournamentsDetails } from "@/redux/features/auth/authActions";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toaster, { toast } from "../Toaster/Toaster";

function Player4({ id }: { id: string }) {
    const { socket, user } = useSelector((state: any) => state?.auth)
    const [time, setTime] = useState(10);
    const [state, setState] = useState(true);
    const [details, setDetails] = useState<any>()
    const dispatch: any = useDispatch()
    const router = useRouter()
    const [usersOnline, setUsersOnline] = useState<string[]>([])
    const [opponent, setOpponent] = useState<any>()
    const [matchs, setMatchs] = useState<any>([])
    const [gameDetails, setGameDetails] = useState<any>()

    useEffect(() => {
        if (time > 0 && usersOnline?.length >= details?.joined?.length) {
            const interval = setInterval(() => setTime(time - 1), 1000)
            return () => clearInterval(interval)
        } else if (usersOnline?.length >= details?.joined?.length) {
            router.replace("/tournament/start/" + id)
            socket.emit("user-offline")
            setTime(10)
        }
    }, [id, matchs, router, socket, time, usersOnline,details])

    useEffect(() => { socket.emit("user-online", {}, (data: any) => { setUsersOnline(data) }) }, [socket])

    useEffect(() => {

        socket.emit("get-matchs-tournament", {}, ([...data]:any) => {
            if (data) {
                console.log(data)
                setMatchs([...data])
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
    }, [dispatch, socket, user,usersOnline])

    useEffect(() => {
        const res = dispatch(getTournamentsDetails(id))
        res.then((x: any) => {
            console.log(x)
            setDetails(x?.payload)
        })
    }, [dispatch, id,usersOnline])

    const userOnline = useCallback((data: any) => {
        setUsersOnline(data)
        return
    }, [])

const loser = useCallback(()=>{
    socket.emit("user-offline")
    toast.showToast("Your Loose this match !" , "red")
    setTimeout(()=>router.replace("/dashboad"),2000)
},[router, socket])

    

    useEffect(() => {
        socket.on("user-online", userOnline)
        socket.on("loser",loser)
        return () => {
            socket.off("user-online", userOnline)
            socket.off("loser",loser)
        }
    }, [socket, userOnline])

    useEffect(() => {
            // socket.emit("game-rearange")
    }, [matchs, socket, usersOnline])





    return (<div className="w-[100vw] h-screen flex flex-col justify-center items-center">
        <Toaster/>
        {state ? <button className="bg-indigo-700 px-6 py-3 text-sm absolute top-2 right-2 rounded" onClick={() => setState(!state)}>Your Match</button> : <button className="bg-indigo-700 px-6 py-3 text-sm absolute top-2 right-2 rounded" onClick={() => setState(!state)}>Tournament Matchs</button>}

        {state ? <div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Users
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {details?.joined?.map((x: any, index: number) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {x?.fullName}
                                </th>
                                <td className="px-6 py-4">
                                    {x?.score || 0}
                                </td>
                                <td className="px-6 py-4">
                                    {usersOnline.includes(x?.email) ? "Ready" : "Not Ready"}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>


            <button className="bg-indigo-700 px-6 py-3 text-sm absolute top-2 left-2 rounded">{time}</button>
            {matchs?.map((x: any,i:number) => (
                <div className="w-[500px] flex justify-between items-center" key={i}>
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
