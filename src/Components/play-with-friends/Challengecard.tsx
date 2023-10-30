import React from "react";
import { useSelector } from "react-redux";

function Challengecard({ name, email, rank, score, room }: { name: string, email: string, rank: number, score: number, room: string }) {
    const { socket,user } = useSelector((state: any) => state.auth)
    return <div className="flex w-full justify-between  rounded p-2 mt-5 card-gradient">
        <div>
            <h1>Name:{name}</h1>
            <h2 className="text-[12px]">{email}</h2>
            <h3 className="text-[9px]">Rank:{rank || 0}</h3>
            <h3 className="text-[9px]">Score:{score || 0}</h3>
        </div>
        <div className="flex justify-center items-center">
            <button
                type="submit"
                onClick={() => {
                    socket.emit("challenge", { user: email, link: "/play-with-friends/local-room/" + room ,sender:user?.fullName})
                }}
                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Challenge
            </button>



        </div>
    </div>;
}

export default Challengecard;
