"use client";
import { getRoomId, getUser } from "@/redux/features/auth/authActions";
import { errorFalse, resetFalse } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

function Page() {
  const route = useRouter();
  const { reset } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  const [room,setRoom] = useState<any>()
  const { user,error } = useSelector((state: any) => state.auth);
  
  useEffect(()=>{
    if(error){
      route.replace("/")
      dispatch(errorFalse())
    }
  })
  useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(getUser());
    }else{
      route.replace("/")
    }
  }, [dispatch, route]);

  useEffect(() => {
    if (reset) {
        route.push("/play-with-friends/local-room/"+reset);
        dispatch(resetFalse())
    }
  }, [reset,dispatch,route]);


  const handleCreateRoom = () => {
    dispatch(getRoomId());
  };
  return (
    <div className="h-screen w-screen overflow-hidden">
      <button
          onClick={()=>{
            route.replace("/dashboard")
          }}
          className="fixed left-3 top-2 justify-center m-2 rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-house" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" /> <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" /> </svg>
   </button>
        <button
          onClick={handleCreateRoom}
          className="fixed right-3 justify-center m-2 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Room
        </button>
      <div className="flex flex-col justify-center items-center h-full">
        <input type="text" value={room} placeholder="Enter The Room ID" className="block ps-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setRoom(parseInt(e.target.value))} />
        <button
        onClick={()=>route.push("/play-with-friends/local-room/"+room)}
          className=" justify-center m-2 rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default Page;
