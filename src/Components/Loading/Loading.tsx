"use client";
import React, { useEffect } from "react";
import "./Loading.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { errorFalse } from "@/redux/features/auth/authSlice";
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
        apiKey: "AIzaSyC-yByDGOtQdJmcVgovgh9l-0H-xRyjGgQ",
        authDomain: "tic-tac-toe-ee2b1.firebaseapp.com",
        projectId: "tic-tac-toe-ee2b1",
        storageBucket: "tic-tac-toe-ee2b1.appspot.com",
        messagingSenderId: "167887642006",
        appId: "1:167887642006:web:9c685ef79cc33aa53151b7",
        measurementId: "G-4305T2Q9Z9"
      };

      const app = initializeApp(firebaseConfig);
      const msg = getMessaging(app)
      const token = await getToken(msg, { vapidKey: "BL1BJgUz91cE-RTaHh9NcgGc97RqiCGWLJxmt6d8jflu_F1gVShjh_fv9h0pqrEVOEIYMcwGHzBzVLiP27RfEhs" })
      instance.post("/addNotification", { nId: token })
    }
  }
  const route = useRouter()
  useEffect(() => {
    if (error) {
      route.replace("/")
      dispatch(errorFalse())
    }
    if (user) {
      reqPermision()
    }
  }, [user, error])
  useEffect(() => {
    if (Cookies.get("token") && !user) {
      dispatch(getUser());
    } else {
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
