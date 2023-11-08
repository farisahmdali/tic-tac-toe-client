"use client"
import { withdrawLogin } from "@/redux/features/auth/authActions";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

function Page() {
    const dispatch:any = useDispatch()
    const route = useRouter()

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        
        const username = e.target[0].value
        const pass = e.target[1].value
       const res = dispatch(withdrawLogin({username,password:pass}))
       res.then((x:any)=>{
        route.replace("/withdraw/data")
       })
        console.log(username,pass)
    }
  return (<div><div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
      Sign in to your Withdraw Account
    </h2>
  </div>
  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-400"
        >
          Username
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="text"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-400"
          >
            Password
          </label>        
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  
  </div>
</div></div>);
}

export default Page;
