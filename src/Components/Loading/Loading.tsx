"use client";
import React, { useEffect } from "react";
import "./Loading.css";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { errorFalse, setgoToRoute } from "@/redux/features/auth/authSlice";
import { getUser } from "@/redux/features/auth/authActions";
import Cookies from "js-cookie";
import { getMessaging, getToken } from "firebase/messaging";
import instance from "@/configs/axios";
import { initializeApp } from "firebase/app";

function Loading() {
  const { loading, error, user } = useSelector((state: any) => state.auth);
  const dispatch: any = useDispatch();
  const reqPermision = async () => {
    const permission = await Notification.requestPermission()
    if (permission === "granted") {
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_STRGBUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MSG_SENDER_ID+"",
        appId: process.env.NEXT_PUBLIC_APPID+"",
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
      };

      const app = initializeApp(firebaseConfig);
      const msg = getMessaging(app)
      const token = await getToken(msg, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY })
      instance.post("/addNotification", { nId: token })
    }
  }
  const path = usePathname()
  const route = useRouter()
  useEffect(() => {
    if (error) {
      dispatch(setgoToRoute(path))
      route.replace("/")
      dispatch(errorFalse())
    }
    if (user) {
      reqPermision()
    }
  }, [user, error, route, dispatch])
  useEffect(() => {
    if (Cookies.get("token") && !user) {
      dispatch(getUser());
    } else {
      dispatch(setgoToRoute(path))
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
