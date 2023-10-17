"use client";
import React,{useEffect} from "react";
import "./Loading.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { errorFalse } from "@/redux/features/auth/authSlice";
import { getUser } from "@/redux/features/auth/authActions";
import Cookies from "js-cookie";

function Loading() {
  const { loading,error,user } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
const route = useRouter()
  useEffect(()=>{
    if(error){
      route.replace("/")
      dispatch(errorFalse())
    }
  },[])
  useEffect(() => {
    if (Cookies.get("token") && !user) {
      dispatch(getUser());
    }else{
      route.replace("/")
    }
  }, [dispatch, route]);
  return (
    <>
      {loading ? (
        <div className="center">
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
        </div>
      ) : null}
    </>
  );
}

export default Loading;
