import React from "react";

interface ShowUser {
  name: string;
  email: string;
  rank: string | null | undefined;
  score: string | null | undefined;
  setHostDetails: any;
  hostDetails: any;
}

function ShowUsers({
  name,
  email,
  rank,
  score,
  setHostDetails,
  hostDetails,
}: ShowUser) {
  return (
    <div className="flex w-full justify-between  rounded p-2 mt-5 card-gradient">
      <div>
        <h1>Name:{name}</h1>
        <h2 className="text-[12px]">{email}</h2>
        <h3 className="text-[9px]">Rank:{rank || 0}</h3>
        <h3 className="text-[9px]">Score:{score || 0}</h3>
      </div>
      <div className="flex justify-center items-center">
        {!hostDetails?.invite?.includes(email) ? (
          <button
            type="submit"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e) =>
              setHostDetails({
                ...hostDetails,
                invite: [...hostDetails?.invite, email],
              })
            }
          >
            Select
          </button>
        ) : (
          <button
            type="submit"
            className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
                const array = hostDetails?.invite
              const index = array?.indexOf(email);
              if (index !== -1) {
                array.splice(index, 1);
              }
              setHostDetails({...hostDetails,invite:array})
            }}
          >
            Deselect
          </button>
        )}
      </div>
    </div>
  );
}

export default ShowUsers;
