"use client";

import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout as setLogout } from "@/redux/features/authSlice";
import { useLogoutMutation } from "@/redux/features/authApiSlice";
import Link from "next/link";
import Image from "next/image";
import EssaySearchForm from "../forms/EssaySearchForm";

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
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <nav className="top-0 left-0 w-full bg-color-a shadow-md z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="AI Essay Reviewer Logo"
                width={25}
                height={25}
                className="object-contain"
              />
              <span className="text-xl font-medium font-arial text-gray-800">
                AI Essay Reviewer
              </span>
            </Link>
          </div>
          <div className="flex-1 max-w-md mx-6">
            <EssaySearchForm />
          </div>

          {isAuthenticated ? "LOGGED IN" : "NOT LOGGED IN"}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/upload"
              className="text-gray-600 hover:text-blue-500 hidden"
            >
              Upload Essay
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
