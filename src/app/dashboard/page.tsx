"use client";
import Cards from "@/Components/dashboard/Cards";
import Navbar from "@/Components/dashboard/Navbar";
import Sidebar from "@/Components/dashboard/Sidebar";
import { getTournaments, saveTournaments } from "@/redux/features/auth/authActions";
import { resetTournament } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
  const dispatch: any = useDispatch();
  const [limit,setLimit] = useState(0)
  const router = useRouter()
  const {tournaments} = useSelector((state:any)=>state.auth)
  useEffect(()=>{
    dispatch(resetTournament())
    dispatch(getTournaments(limit));
    setLimit(tournaments?.length+50)
  },[])

  console.log(tournaments);
  


  return (
    <div>
      {/* <Sidebar /> */}
      <div className="pt-14 ps-20 flex flex-wrap grid-cols-1 ">
        {tournaments.map((x:any,index:number)=>(
          // eslint-disable-next-line react/jsx-key
          <div>
            <Cards val={x} key={index} handleClick={()=>{
              let res = dispatch(saveTournaments(x._id))
              res.then(async ()=>{
               await dispatch(resetTournament())
                dispatch(getTournaments(0));
              })
            }} 
            handleClickPlay={()=>{
              router.push("/tournament/"+x?.type+"/"+x?._id)
            }}
            />
          </div>
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
