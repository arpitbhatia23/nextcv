"use client";

import Image from "next/image";

const Logo2 = ({ ClassName, size, color = "black" }) => {
  return (
    <div className={`${ClassName}`}>
      <Image
        src={`${color === "black" ? "/logos/nextcvlogo.png" : "/logos/nextcvlogolight.png"}`}
        width={200}
        height={200}
        alt="nextcv logo"
      />
    </div>
  );
};

export default Logo2;
