"use client";
import Toaster, { toast } from "@/Components/Toaster/Toaster";
import ShowUsers from "@/Components/create-tournament/ShowUsers";
import { getUser, hostTournament, searchUser } from "@/redux/features/auth/authActions";
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
    view: true,
    amount:0,
  });
  const [instant, setInstant] = useState(false);
  const { searchUserRes, socket, user } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  // useEffect(()=>{
  //   if(reset){
  //     toast.showToast("Created Tournament Successfully","green")
  //     setTimeout(()=>router.replace("/dashboard") ,2000)
  //     dispatch(resetFalse())
  //   }
  // },[dispatch, reset, router])

  useEffect(() => {
    dispatch(getUser());
  }, []);
  const handleSearch = () => {
    dispatch(searchUser(search));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(hostDetails.amount*100<=user?.credit){
      const res = dispatch(hostTournament(hostDetails));
      res.then((res: any) => {
        if (hostDetails?.instant) {
          for (let i = 0; i < hostDetails.invite.length; i++) {
            socket.emit("challenge", { user: hostDetails.invite[i], link: "/tournament/" + hostDetails?.type + "/" + res.payload.hostId, sender: user?.fullName })
          }
          router.replace("/tournament/" + hostDetails?.type + "/" + res.payload.hostId)
        } else {
          toast.showToast("Created Tournament Successfully", "green")
          setTimeout(() => router.replace("/dashboard"), 2000)
        }
      })
    }else{
      toast.showToast("Please Add some Credits","red")
    }
  };

  return (
    <div>
      <Toaster />
      <button
        onClick={() => {
          router.replace("/dashboard")
        }}
        className="fixed left-3 top-2 justify-center m-2 rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="currentColor" className="bi bi-house" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" /> <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" /> </svg>
      </button>
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
            <input
              type="number"
              placeholder="Amount"
              className="block border border-grey-light w-full p-1 rounded mb-4"
              required
              onChange={(e) =>
                setHostDetails({ ...hostDetails, amount: parseInt(e.target.value) })
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
                active={x?.active || false}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
