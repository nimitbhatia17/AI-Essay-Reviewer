import Link from "next/link";
import { PasswordResetConfirmForm } from "@/app/components/forms";

export const metadata = {
  title: "Password Reset Confirm | MBA Assistant",
  description: "Reset your password for MBA Assistant",
};

export default function Page({ params: { uid, token } }) {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Admissions Gateway: MBA Assistant"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <PasswordResetConfirmForm uid={uid} token={token} />
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
