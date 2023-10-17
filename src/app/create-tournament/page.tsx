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
    limit: 0,
    type: "public",
    instant: false,
    date: "",
    time: "",
    view:true,
  });
  const [instant, setInstant] = useState(false);
  const { searchUserRes,reset } = useSelector((state: any) => state.auth);
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
        router.replace("/tournament/"+hostDetails?.type+"/"+res.payload)
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
              required
              onChange={(e) =>
                setHostDetails({
                  ...hostDetails,
                  limit: parseInt(e.target.value),
                })
              }
            >
              <option selected value="">
                Number of players
              </option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>
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
                  <label htmlFor="view" className="text-white">
                    <input
                      type="checkbox"
                      id="view"
                      placeholder="instance"
                      className="me-2"
                      onChange={() => {
                        setHostDetails({...hostDetails,view:!hostDetails.view})
                      }}
                    />
                    Viewers are not allowed
                  </label>
            <label htmlFor="instant" className="text-white">
              <input
                type="checkbox"
                id="instant"
                placeholder="instance"
                className="me-2"
                onChange={() => {
                  setInstant(!instant);
                  setHostDetails({
                    ...hostDetails,
                    instant: !hostDetails.instant,
                  });
                }}
              />
              Quick Start
            </label>
            {!instant ? (
              <>
                <input
                  type="date"
                  className="block border border-grey-light w-full p-1 rounded mb-4"
                  required
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    const currentDate = new Date();
                    if (
                      date.getDate() >= currentDate.getDate() &&
                      date.getMonth() >= currentDate.getMonth() &&
                      date.getFullYear() >= currentDate.getFullYear()
                    ) {
                      setHostDetails({ ...hostDetails, date: e.target.value });
                    } else {
                      e.target.value = "";
                      toast.showToast("Please select a valid date", "red");
                    }
                    let elem:any = window.document.getElementById("time")
                    elem.value = ""
                    
                  }}
                />
                <input
                  type="time"
                  id="time"
                  className="block border border-grey-light w-full p-1 rounded mb-4"
                  required
                  onChange={(e) => {
                    const inputTime = e.target.value;
                    const currentTime = new Date();
                    const date = new Date(hostDetails.date);
                    console.log(currentTime);
                    const [inputHours, inputMinutes] = inputTime
                      .split(":")
                      .map(Number);

                    if (
                      date.getDate() > currentTime.getDate() &&
                      date.getMonth() >= currentTime.getMonth() &&
                      date.getFullYear() >= currentTime.getFullYear()
                    ) {
                      setHostDetails({ ...hostDetails, time: e.target.value });
                    } else {
                      if (
                        inputHours >= currentTime.getHours() &&
                        inputMinutes > currentTime.getMinutes()
                      ) {
                        setHostDetails({
                          ...hostDetails,
                          time: e.target.value,
                        });
                      } else {
                        e.target.value = "";
                        toast.showToast("Please Select a valid time", "red");
                      }
                    }
                  }}
                />
              </>
            ) : null}

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
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
                value={search}
                onChange={(e) => SetSearch(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          <div className="overflow-auto max-h-[calc(100vh-9rem)] ps-2 pe-2">
            {searchUserRes?.map((x: any) => (
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
