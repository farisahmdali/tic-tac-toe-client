"use client";
import React,{useEffect} from "react";
import "./Loading.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { errorFalse } from "@/redux/features/auth/authSlice";
import { getUser } from "@/redux/features/auth/authActions";
import Cookies from "js-cookie";
import { getToken } from "firebase/messaging";
import { msg } from "@/configs/firbase";
import instance from "@/configs/axios";

function Loading() {
  const { loading,error,user } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  const reqPermision = async () => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
    const token = await getToken(msg,{vapidKey:"BL1BJgUz91cE-RTaHh9NcgGc97RqiCGWLJxmt6d8jflu_F1gVShjh_fv9h0pqrEVOEIYMcwGHzBzVLiP27RfEhs"})
    instance.post("/addNotification",{nId:token})
    }
  }
const route = useRouter()
  useEffect(()=>{
    if(error){
      route.replace("/")
      dispatch(errorFalse())
    }
    if(user){
      reqPermision()
    }
  },[user,error])
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
