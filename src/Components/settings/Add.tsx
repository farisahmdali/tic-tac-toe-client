import { addfrnd, removefrnd } from "@/redux/features/auth/authActions";
import React from "react";
import { useDispatch } from "react-redux";

function Add({name,email,rank,score,id,frnds,setAdd}:{name:string,email:string,rank:number,score:number,id:string,frnds:any,setAdd:any}) {
    const dispatch:any = useDispatch()
    
  return <div className="flex w-full justify-between  rounded p-2 mt-5 card-gradient">
  <div>
    <h1>Name:{name}</h1>
    <h2 className="text-[12px]">{email}</h2>
    <h3 className="text-[9px]">Rank:{rank || 0}</h3>
    <h3 className="text-[9px]">Score:{score || 0}</h3>
  </div>
  <div className="flex justify-center items-center">
    {!frnds?.includes(id) ? <button
        type="submit"
        onClick={()=>{
            dispatch(addfrnd(id))
            setAdd()
        }}
        className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add as Friend
      </button>:<button
        type="submit"
        onClick={()=>{
            dispatch(removefrnd(id))
            setAdd()
        }}
        className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Remove
      </button>}
  
      
   
  </div>
</div>;
}

export default Add;
