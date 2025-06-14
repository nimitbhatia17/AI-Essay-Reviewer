"use client";

import useVerify from "@/app/hooks/use-verify";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Setup() {
  useVerify();
  return (
    <ToastContainer
      autoClose={2000}
      transition={Slide}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
    />
  );
}
