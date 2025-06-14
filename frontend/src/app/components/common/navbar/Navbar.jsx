"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import Link from "next/link";
import EssaySearchForm from "../../forms/EssaySearchForm";
import { toast } from "react-toastify";
import NavbarButton from "./NavbarButton";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
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
    <nav className="top-0 fixed left-0 w-full bg-white shadow-md z-500">
      <div className="max-w-8xl px-30">
        <div className="flex justify-between items-center h-30">
          <div className="flex items-center">
            <Link href="/" className="flex flex-col items-end">
              <span className="text-5xl font-sans text-gray-800">
                <strong className="font-extrabold">MBA</strong>{" "}
                <span className="">ASSISTANT</span>
              </span>
              <span className="flex text-sm font-sans text-gray-800">
                <strong className="text-sm font-sans font-extrabold text-gray-800">
                  by ADMISSIONS
                </strong>{" "}
                <span className="text-sm font-sans text-gray-800">
                  &nbsp;GATEWAY
                </span>
              </span>
            </Link>
          </div>

          <EssaySearchForm />
          <div>
            {isAuthenticated ? (
              <div className="flex items-center">
                <NavbarButton hrefString={"/chat"} displayText={"CHAT"} />
                <NavbarButton
                  hrefString={"/"}
                  displayText={"LOGOUT"}
                  onClickHandler={handleLogout}
                />
              </div>
            ) : (
              <div className="flex items-center">
                <NavbarButton
                  hrefString={"/auth/login"}
                  displayText={"LOGIN"}
                />
                <NavbarButton
                  hrefString={"/auth/register"}
                  displayText={"REGISTER"}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
