"use client";
import Toaster, { toast } from "@/Components/Toaster/Toaster";
import ShowUsers from "@/Components/create-tournament/ShowUsers";
import { hostTournament, searchUser } from "@/redux/features/auth/authActions";
import { resetFalse } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Page() {
  const [search, SetSearch] = useState("");
  const router = useRouter()
  const [hostDetails, setHostDetails] = useState({
    invite: [],
    head: "",
    description: "",
    limit: 4,
    type: "public",
    instant: true,
    date: "",
    time: "",
    view:true,
  });
  const [instant, setInstant] = useState(false);
  const { searchUserRes,socket,user } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  // useEffect(()=>{
  //   if(reset){
  //     toast.showToast("Created Tournament Successfully","green")
  //     setTimeout(()=>router.replace("/dashboard") ,2000)
  //     dispatch(resetFalse())
  //   }
  // },[dispatch, reset, router])

  useEffect(() => {
    dispatch(searchUser(search));
  }, []);
  const handleSearch = () => {
    dispatch(searchUser(search));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(hostDetails);
    const res = dispatch(hostTournament(hostDetails));
    res.then((res:any)=>{
      if(hostDetails?.instant){
        console.log(res)
        for(let i=0;i<hostDetails.invite.length;i++){
          console.log(hostDetails.invite[i])
          socket.emit("challenge", { user: hostDetails.invite[i], link: "/tournament/"+hostDetails?.type+"/"+res.payload.hostId ,sender:user?.fullName})
        }
        router.replace("/tournament/"+hostDetails?.type+"/"+res.payload.hostId)
      }else{
        toast.showToast("Created Tournament Successfully","green")
      setTimeout(()=>router.replace("/dashboard") ,2000)
      }
      })
  };

  return (
    <div>
      <Toaster/>
      <div className="flex p-5 h-screen">
        <div className="md:w-1/3 w-1/2 flex flex-col justify-center h-full items-center">
          <h1 className="mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
            Host Tournament
          </h1>
          <form
            className="flex flex-col  justify-between text-black"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Name for the Tournament"
              className="block border border-grey-light w-full p-1 rounded mb-4"
              required
              onChange={(e) =>
                setHostDetails({ ...hostDetails, head: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="block border border-grey-light w-full p-1 rounded mb-4"
              onChange={(e) =>
                setHostDetails({ ...hostDetails, description: e.target.value })
              }
            />
            <select
              name=""
              id=""
              className="block border border-grey-light w-full p-1 rounded mb-4"
              onChange={(e) =>
                setHostDetails({ ...hostDetails, type: e.target.value })
              }
            >
              <option value={"public"}>Public</option>
              <option value={"private"}>Private</option>
            </select>
                 
           
            

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Host
            </button>
          </form>
        </div>

        <div className="border  md:w-2/3 w-1/2">
          <div className="p-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
          </div>
          <div className="overflow-auto max-h-[calc(100vh-9rem)] ps-2 pe-2">
            {user?.frnds?.map((x: any) => (
              <ShowUsers
                name={x?.fullName}
                email={x?.email}
                rank={x?.rank}
                score={x?.score}
                key={x?.email}
                setHostDetails={setHostDetails}
                hostDetails={hostDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
