"use client";
import React, { cache } from "react";

export const GetYear = () => {
  const getYear = cache(() => new Date().getFullYear());

  return <span>&copy; {getYear()} NextCV. All rights reserved.</span>;
};
