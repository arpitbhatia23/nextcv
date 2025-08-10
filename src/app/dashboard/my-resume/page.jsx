import MyResume from "@/components/MyResume";
import React from "react";
export async function generateMetadata() {
  return {
    title: "My Resume - NXTCV",
    description: "A modern AI resume builder.",
  };
}

const page = () => {
  return (
    <div>
      <MyResume />
    </div>
  );
};

export default page;
