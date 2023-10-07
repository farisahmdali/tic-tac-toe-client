"use client";
import { otp, resetPassword, resetPasswordOtp } from "@/redux/features/auth/authActions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Verification from "../signup/Verification";
import Toaster, { toast } from "../Toaster/Toaster";
import { errorFalse, resetFalse } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

function ForgotPassword({ setForgot }: { setForgot: any }) {
  const [data, setData] = useState<any>({});
  const [verify, setVerify] = useState(true);
  const dispatch: any = useDispatch();
  const { error, reset } = useSelector((state: any) => state.auth)
  const router = useRouter()
  const [coutdown,setCountDown] = useState(100)


  useEffect(() => {
    if (coutdown > 0 && !verify) {
      const interval = setInterval(() => setCountDown(coutdown - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [coutdown,verify])

  useEffect(() => {
    if (error) {
      toast.showToast("OTP is Incorrect", "red")
      dispatch(errorFalse())
    }
  }, [error, dispatch])

  useEffect(() => {
    if (reset) {
      toast.showToast("Password changed successfully", "green")
      dispatch(resetFalse())
      setTimeout(() => setForgot(false), 2000)
    }
  }, [reset, dispatch])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (e.target[1].value?.length >= 8) {

      setData({ email: e.target[0].value, password: e.target[1].value });
      dispatch(resetPasswordOtp(e.target[0].value + ""));
      setVerify(false);
    } else {
      toast.showToast("Password should contain atleast 8 characters", "#f57b42")
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-400">
          Reset the Password
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {verify ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-400"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
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
                  New Password
                </label>
                <div className="text-sm">
                  <p
                    onClick={() => setForgot(false)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    back to login
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
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
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault()
            dispatch(resetPassword(data))
          }}>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-400">
                  Enter The OTP
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  onChange={(e: any) => {
                    setData({ ...data, otp: parseInt(e.target.value) });
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {coutdown > 0 ?
          <p className="text-indigo-600">{coutdown} Sec</p> :
          <p className="text-indigo-600 cursor-pointer hover:text-indigo-400" onClick={()=>{
            setCountDown(100);
            dispatch(resetPasswordOtp(data.email))
          }}>Resend OTP</p>
        }
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full mt-6 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
