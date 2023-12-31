"use client";
import Login from "@/Components/login/Login";
import { getUser, login } from "@/redux/features/auth/authActions";
import Image from "next/image";
import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Toaster, { toast } from "@/Components/Toaster/Toaster";
import { errorFalse, removegoToRoute } from "@/redux/features/auth/authSlice";
import ForgotPassword from "@/Components/login/ForgotPassword";

export default function Home() {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const { token, error, user,goToRoute } = useSelector((state: any) => state.auth);
  const [forgotPassword,setForgotPassword]=useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(login({ email: e.target[0].value, password: e.target[1].value }));
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      dispatch(getUser());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (error && !forgotPassword) {
    toast.showToast("Email or Password incorrect", "red");
      dispatch(errorFalse());
    }
  }, [error,dispatch]);

  useEffect(() => {
    if (user && Cookies.get("token")) {
      if(goToRoute){
        const r = goToRoute
      dispatch(removegoToRoute())
        router.replace(r)
      }else{
        router.replace("/dashboard");
      }
    }
  }, [user, router]);

  return (
    <>
    <Toaster/>
    {!forgotPassword ? 
      <Login handleSubmit={handleSubmit} forgot={setForgotPassword}/>
    :<ForgotPassword setForgot={setForgotPassword}/>}
    </>
  );
}
