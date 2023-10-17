"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getUser } from "@/redux/features/auth/authActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorFalse } from "@/redux/features/auth/authSlice";

function Navbar() {
  const { user,error } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
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
    <div className="fixed w-screen bg-[#00000000] h-11 flex justify-between items-center border ps-14 pe-2 border-[#2D2F39]">
      <div>
        <div className="bg-[#2D2F39] flex ps-2 rounded h-8 p-1">
        <img className="w-5 h-5 rounded-full" src={user?.pic ? user?.pic : "./no-pic.jpg"} alt="Rounded avatar" />
          <h1 className="text-sm ms-1">{user?.fullName}</h1>
          <div className="ms-8">
            <p className=" text-[9px]">Rank-{user?.rank || 0}</p>
            <p className="text-[9px]">score-{user?.score || 0}</p>
          </div>
        </div>
      </div>
      <div className="relative outline-none">
              <div className="absolute inset-y-0 left-0 flex items-center outline-none pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full pl-12 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
              />
              <button
                type="submit"
                className="text-white absolute text-[10px] right-2.5 bottom-[2.5px] bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-4 "
              >
                Search
              </button>
            </div>
      <div className="flex">
        <Link
          href={"/create-tournament"}
          className="justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
