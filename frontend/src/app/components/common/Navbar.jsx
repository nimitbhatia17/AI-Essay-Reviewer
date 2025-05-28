"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import Link from "next/link";
import EssaySearchForm from "../forms/EssaySearchForm";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, userId } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
        toast.success("User Logged out successfully!");
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <nav className="top-0 left-0 w-full bg-color-white shadow-md z-50">
      <div className="max-w-8xl px-30">
        <div className="flex justify-between items-center h-30">
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-end">
              <span className="text-5xl font-sans text-gray-900">
                <strong className="font-extrabold">MBA</strong>{" "}
                <span className="">ASSISTANT</span>
              </span>
              <span className="flex text-sm font-sans text-gray-900">
                <strong className="text-sm font-sans font-extrabold text-gray-900">
                  by ADMISSIONS
                </strong>{" "}
                <span className="text-sm font-sans text-gray-900">
                  &nbsp;GATEWAY
                </span>
              </span>
            </Link>
          </div>

          <EssaySearchForm />
          <div>
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link href={"/chat"}>
                  <div className="bg-black w-35 text-center hover:bg-gray-100 hover:border-1 hover:border-black hover:text-black text-white font-sans font-extrabold py-4 px-4 mx-3 transition duration-400">
                    CHAT
                  </div>
                </Link>

                <Link href={"/"} onClick={handleLogout}>
                  <div className="bg-black w-35 text-center hover:bg-gray-100 hover:border-1 hover:border-black hover:text-black text-white font-sans font-extrabold py-4 px-4 mx-3 transition duration-400">
                    LOGOUT
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center">
                <Link href={"/auth/login"}>
                  {" "}
                  <div className="bg-black w-35 text-center hover:bg-gray-100 hover:border-1 hover:border-black hover:text-black text-white font-sans font-extrabold py-4 px-4 mx-3 transition duration-400">
                    LOGIN
                  </div>
                </Link>

                <Link href={"/auth/register"}>
                  {" "}
                  <div className="bg-black w-35 text-center hover:bg-gray-100 hover:border-1 hover:border-black hover:text-black text-white font-sans font-extrabold py-4 px-4 mx-3 transition duration-400">
                    REGISTER
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
