"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Page() {
    const { socket } = useSelector((state:any) => state.auth)
    const router = useRouter()
    useEffect(() => {
        socket.emit("random",{},(data:any)=>{
            if(data){
                router.replace("/play-with-friends/local-room/"+data)
            }
        });
    }, [router, socket])

    useEffect(()=>{
        socket.on("random",(data:any)=>{
            if(data){
                router.replace("/play-with-friends/local-room/"+data)
            }
        })
        return ()=>{
            socket.off("random",(data:any)=>{
                if(data){
                    router.replace("/play-with-friends/local-room/"+data)
                }
            })
        }
    },[router, socket])
    return <div className="h-screen w-screen flex flex-col pb-[50vh] justify-between">
        <button className="absolute bg-red-600 rounded top-1 left-1 px-5 py-3" onClick={()=>{
            router.replace("/dashboard")
        }}>Leave</button>
        <div className="flex justify-center items-center w-full p-2">
        <h1>searching.....</h1>
        </div>
        <div className="flex self-center">
            <div className="bg-red-600 h-20 w-20 animate"></div>
            <div className="bg-red-600 h-20 w-20 ms-2 animate"></div>
            <div className="bg-red-600 h-20 w-20 ms-2 animate"></div>
            <div className="bg-red-600 h-20 w-20 ms-2 animate"></div>
            <div className="bg-red-600 h-20 w-20 ms-2 animate"></div>
        </div>

    </div>;
}

export default Page;
