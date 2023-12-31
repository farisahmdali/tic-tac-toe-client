"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getTournaments, getUser, searchTournament } from "@/redux/features/auth/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorFalse, resetTournament, setTournament } from "@/redux/features/auth/authSlice";

function Navbar() {
  const { user,error } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  const [search,SetSearch] = useState<any>();
const route = useRouter()
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
  return (
    <div className="fixed w-screen bg-[#00000000] h-11 flex justify-between items-center border z-0 ps-14 pe-2 border-[#2D2F39]">
      <div>
        <div className="bg-[#2D2F39] flex ps-2 min-w-[110px] justify-between rounded h-8 p-1">
          <h1 className="text-sm ms-1">{user?.fullName}</h1>
          <div className="ms-8">
            <p className=" text-[9px]">Rank-{user?.rank || 0}</p>
            <p className="text-[9px]">score-{user?.score || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="flex">
      <Link
          href={"/play-single"}
          className="justify-center ms-2 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Play 
        </Link>
        <Link
          href={"/create-tournament"}
          className="justify-center ms-2 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Tournament
        </Link>
        <Link
        href={"/play-with-friends"}
          className=" justify-center ms-2 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Play with Friends
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
