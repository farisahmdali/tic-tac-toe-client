"use client";
import { getRoomId } from "@/redux/features/auth/authActions";
import { resetFalse } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Page() {
  const route = useRouter();
  const { reset } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (reset) {
        route.push("/play-with-friends/create-room/"+reset);
        dispatch(resetFalse())
    }
  }, [reset,dispatch,route]);

  const handleCreateRoom = () => {
    dispatch(getRoomId());
  };
  return (
    <div className="h-screen w-screen justify-center flex items-center">
      <div className="flex flex-col">
        <button
          onClick={handleCreateRoom}
          className=" justify-center m-2 rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Room
        </button>
        <Link
          href={"/play-with-friends"}
          className=" justify-center m-2 rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Join Room
        </Link>
      </div>
    </div>
  );
}

export default Page;
