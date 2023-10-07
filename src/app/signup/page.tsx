"use client";
import { toast } from "@/Components/Toaster/Toaster";
import SignupForm from "@/Components/signup/SignupForm";
import Verification from "@/Components/signup/Verification";
import { getUser, otp, signup } from "@/redux/features/auth/authActions";
import { errorFalse } from "@/redux/features/auth/authSlice";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function Page() {
  const [data, setData] = useState<{
    fullName: string;
    email: string;
    password: string;
    otp:number;
  }>({
    fullName: '',
    email: '',
    password: '',
    otp:0
  });
  
  const router = useRouter()
  const [otpPage, setOtp] = useState(false);
  const dispatch: any = useDispatch();
  const {error,otpStatus,token,user} = useSelector((state: any) => state.auth);
  const reset = () =>{
    dispatch(otp(data.email))
  }

useEffect(()=>{
if(error){
  toast.showToast("User Already exist" , "red")
  dispatch(errorFalse())
}
},[error,dispatch])

useEffect(()=>{
  setOtp(otpStatus)
},[otpStatus]);

useEffect(()=>{
  if(user){
    router.replace("/dashboard")
  }
},[user,router])

useEffect(()=>{
  if(Cookies.get("token")){
    dispatch(getUser())
  }
},[token,dispatch])

  const handleSubmit =async (e: any) => {
    e.preventDefault();
    if(e.target[2].value.length >= 8){

      if (e.target[2].value === e.target[3].value) {
        setData({
        fullName: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value,
        otp:0,
      });
      dispatch(otp(e.target[1].value))
      
    } else {
      toast.showToast("Password is not same", "red");
    }
  }else{
    toast.showToast("Password should contain minimum 8 letters","#f57b42")
  }
  };

  const verifySubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    dispatch(signup(data))
  }

  return (
    <div className="flex justify-center items-center">
      <toast.render />
      {!otpPage ? <SignupForm handleSubmit={handleSubmit} /> : <Verification handleChange={(e)=>{setData({...data,otp:parseInt(e.target.value)})}} handleSubmit={verifySubmit} reset={reset}/>}
    </div>
  );
}

export default Page;
