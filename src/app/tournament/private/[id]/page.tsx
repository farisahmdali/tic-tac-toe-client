"use client"
import Toaster, { toast } from "@/Components/Toaster/Toaster";
import { getTournamentsDetails } from "@/redux/features/auth/authActions";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Page({ params }: { params: { id: string } }) {
    const dispatch: any = useDispatch()
    const [time, setTime] = useState(10)
    const { socket, user } = useSelector((state: any) => state.auth)
    const [details, setDetails] = useState<any>()
    const [current, setCurrent] = useState<any>()
    const [players, setPlayers] = useState<any>([])
    const [pass,setPass] = useState(0)
    const [state, setState] = useState(true)
    const router = useRouter()


    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("join-tournament-private", { user: { fullName: user?.fullName, email: user?.email, _id: user?._id }, room: params.id,pass }, (data: any) => {
            if(data){
                console.log(data, "hello");
                setPlayers(data)
                setState(false)
            }else{
                toast.showToast("Code is incorrect","red")
            }
        })
    }

    //timer

    useEffect(() => {
        if (time > 0 && details?.limit === players?.length) {
            const interval = setInterval(() => setTime(time - 1), 1000)
            return () => clearInterval(interval)
        } else if (details?.limit === players?.length) {
            socket.emit("confirm-tournament")
            router.replace("/tournament/play/" + params.id)
        } else {
            setTime(10)
        }
    }, [details?.limit, params.id, players?.length, router, socket, time])


    useEffect(() => {


        window.addEventListener('beforeunload', () => {
            socket.emit("user-exited-tournament", user.email)
            console.log('User clicked back button');
            window.alert("hello")
        });


    }, [socket, user]);


    //socket functions

    const userJoinedTournament = (data: object[]) => {
        setTime(10)
        console.log(data)
        setPlayers(data)
    }

    useEffect(() => {
        const res = dispatch(getTournamentsDetails(params.id))
        res.then((x: any) => {
            setDetails(x?.payload)
        })
        if (user) {

            socket.emit("join-tournament-private", { user: { fullName: user?.fullName, email: user?.email, _id: user?._id }, room: params.id,pass }, (data: any) => {
                if(data){
                    console.log(data, "hello");
                    setPlayers(data)
                    setState(false)
                }
            })
        }
    }, [dispatch, params.id, socket, user])

    useEffect(() => {
        socket.on("updation-tournament-public", userJoinedTournament)

        return () => {
            socket.off("updation-tournament-public", userJoinedTournament)

        }
    }, [socket])

    useEffect(() => {
        setInterval(() => {

            const date = new Date()
            const day = date.getMonth() < 10 ? 0 + "" + date.getMonth() : date.getMonth()
            const minute = date.getMinutes() < 10 ? 0 + "" + date.getMinutes() : date.getMinutes()
            const hour = date.getHours() <= 12 ? date.getHours() < 10 ? 0 + "" + date.getHours() : date.getHours() : date.getHours() - 12 < 10 ? 0 + "" + (date.getHours() - 12) : date.getHours() - 12
            setCurrent({ date: date.getFullYear() + "-" + day + "-" + date.getDate(), time: hour + ":" + minute })
        }, 1000)
    }, [])
    return (
        <div className=" border border-slate-500 h-[95vh] w-[95vw] m-auto my-[10px] p-3 rounded-[12px]">
            <Toaster/>
            {state ? <div className="h-full w-full flex justify-center items-center"> <form
                className="px-6 py-8 rounded shadow-md text-black w-[500px]"
                onSubmit={handleSubmit}
            >
                <h1 className="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
                    Enter The Code
                </h1>
                <input
                    type="number"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="fullname"
                    placeholder="Enter The Code"
                    onChange={(e)=>setPass(parseInt(e.target.value))}
                    required
                />

                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
            </form></div> :
                <>
                    <div className="flex h-[60%] justify-between ">
                        <div className="grid grid-cols-3 gap-4 p-4 w-full">
                            {players?.map((x: any, index: number) => (
                                <div key={index}>
                                    <h1 className="bg-slate-500 p-1 rounded float-left w-full">{index + 1}. {x?.fullName}</h1>
                                </div>

                            ))}
                        </div>
                    </div>

                    <div className="border h-[35%] mt-3 rounded p-3 justify-between flex">
                        <div className="w-10/12 h-full ">
                            <h1 className='underline '>{details?.head}</h1>
                            <h1 className='flex text-xs mt-3'>Description: <p>{details?.description}</p></h1>
                            <h1 className='flex text-xs '>Type : <p>{details?.type}</p></h1>
                            <h1 className='flex text-xs '>Max Player : <p>{details?.limit}</p></h1>
                            {details?.date ? <><h1 className='flex text-xs mt-5'>Date : <p>{details?.date}</p></h1>
                                <h1 className='flex text-xs '>Time : <p>{details?.time}</p></h1></> : <h1 className='flex text-xs mt-5 text-yellow-500 '>Quick Play</h1>}
                        </div>
                        {details?.pass ? <h1>Pass:{details?.pass}</h1>: null}
                        
                        <button
                            className=" justify-center m-2 rounded-full bg-indigo-950 px-5 self-end float-right py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                        >
                            {time}
                        </button>
                    </div></>
            }
        </div>);
}

export default Page;
