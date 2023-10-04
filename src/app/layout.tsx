"use client";

import store from "@/redux/store";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import Loading from "@/Components/Loading/Loading";
import {useSelector} from "react-redux"
import Sidebar from "@/Components/dashboard/Sidebar";
import Navbar from "@/Components/dashboard/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic-Tac-Toe",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const route = usePathname()
const exceptRouteNavAndSide = ["/dashboard","/notification","/matchs","/settings","/schedules","/rank"]
  return (
    <html lang="en">
      <title>Tic-Tac-Toe</title>
      <Provider store={store}>
        <body className={inter.className}><Loading/>{exceptRouteNavAndSide.includes(route) ? <><Sidebar/><Navbar/></> : null}{children}</body>
      </Provider>
    </html>
  );
}
