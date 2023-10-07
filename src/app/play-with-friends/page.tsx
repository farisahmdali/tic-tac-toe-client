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
          onClick={handleCreateRoom}
          className=" justify-center m-2 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
