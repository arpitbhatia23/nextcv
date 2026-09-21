"use client";

import Image from "next/image";
const Logo2 = ({ ClassName = "", color = "black" }) => {
  return (
    <div className={`relative w-20 sm:w-36 md:w-22 lg:w-26 aspect-square ${ClassName}`}>
      <Image
        src={color === "black" ? "/logos/nextcvlogo.png" : "/logos/nextcvlogolight.png"}
        alt="NextCV logo"
        fill
        sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 208px"
        className="object-contain"
      />
    </div>
  );
};
export default Logo2;
