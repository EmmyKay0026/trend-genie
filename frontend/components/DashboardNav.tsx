"use client";
import React, { useEffect } from "react";
import Brand from "./Brand";
import Link from "next/link";
import useUserStore from "@/store/userUserStore";
import { logoutUser } from "@/utils/user";
import { redirect } from "next/navigation";

const DashboardNav = () => {
  const getUser = useUserStore((state) => state.getMe);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user) getUser();
  }, []);

  return (
    <nav className="flex items-center justify-between shadow md:px-[70px]">
      <Brand />
      <Link
        onClick={() => {
          logoutUser();
          
        }}
        className="flex items-center justify-center bg-accent uppercase w-[50px] h-[50px] font-bold  text-2xl rounded-full"
        href={""}
      >
        {user?.email.split("")[0]}
      </Link>
    </nav>
  );
};

export default DashboardNav;
