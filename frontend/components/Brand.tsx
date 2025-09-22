import useUserStore from "@/store/userUserStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Brand = () => {
  return (
    <Link href={"/"}>
      <Image
        src={"/images/trendgenie_logo.png"}
        alt="logo"
        className=""
        width={70}
        height={70}
      />
    </Link>
  );
};

export default Brand;
