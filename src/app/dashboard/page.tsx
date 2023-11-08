"use client";
import Toaster, { toast } from "@/Components/Toaster/Toaster";
import Cards from "@/Components/dashboard/Cards";
import Navbar from "@/Components/dashboard/Navbar";
import Sidebar from "@/Components/dashboard/Sidebar";
import { getTournaments, saveTournaments, searchTournament } from "@/redux/features/auth/authActions";
import { resetTournament, setTournament } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch: any = useDispatch();
  const [search,SetSearch] = useState<any>();
  const [limit,setLimit] = useState(0)
  const router = useRouter()
  const {tournaments,user} = useSelector((state:any)=>state.auth)
  useEffect(()=>{
    dispatch(resetTournament())
    dispatch(getTournaments(limit));
    setLimit(tournaments?.length+50)
  },[])

  


  return (
    <div>
      <Toaster/>
      <div className="absolute right-8 top-14 outline-none">
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
                onChange={(e)=>SetSearch(e.target.value)}
                className="block w-full pl-12 text-sm outline-none text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
              />
              <button
              onClick={()=>{
                if(search){
                  let res = dispatch(searchTournament(search))
                  res.then((x:any)=>{
                    dispatch(setTournament(x?.payload[0]))
                  })
                  
                }else{
                  dispatch(resetTournament())
                  dispatch(getTournaments(50))
                }
              }}
              className="text-white absolute text-[10px] right-2.5 bottom-[2.5px] bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-4 "
              >
                Search
              </button>
            </div>
      <div className="pt-20 ps-20 flex flex-wrap grid-cols-1 ">

        {tournaments.map((x:any,index:number)=>(
          // eslint-disable-next-line react/jsx-key
            <Cards val={x} key={index} handleClick={()=>{
              let res = dispatch(saveTournaments(x._id))
              res.then(async ()=>{
               await dispatch(resetTournament())
                dispatch(getTournaments(0));
              })
            }} 
            handleClickPlay={()=>{
              if(x?.amount*100>user?.credit){
                toast.showToast("No Enough Balance","red")
              }else{
              router.push("/tournament/"+x?.type+"/"+x?._id)
              }
            }}
            />
        ))}
        
        <button
          onClick={()=>{
            dispatch(getTournaments(limit))
            setLimit(limit+50)
          }}
          className=" justify-center m-2 w-[100vw] rounded-full  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-[#aba3a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
         --- Reload ---
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
