"use client";
import React from "react";
import "./Loading.css";
import { useSelector } from "react-redux";

function Loading() {
  const { loading } = useSelector((state: any) => state.auth);
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
