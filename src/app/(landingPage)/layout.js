import { Geist, Geist_Mono } from "next/font/google";

export const metadata = {
  title: "NXTCV",
  description: "A modern Ai resume builder.",
};

export default function RootLayout({ children }) {
  return <section className={` antialiased`}>{children}</section>;
}
