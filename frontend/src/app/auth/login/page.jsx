import Link from "next/link";
import { LoginForm } from "@/app/components/forms";

export const metadata = {
  title: "MBA Assistant | Login",
  description: "Log-in to access the MBA Assistant",
};

export default function Page() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto w-full sm:max-w-sm">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex flex-col items-center">
              <span className="text-3xl font-sans text-gray-900">
                <strong className="font-extrabold">MBA</strong>{" "}
                <span className="">ASSISTANT</span>
              </span>
              <span className="flex text-xs font-sans text-gray-900">
                <strong className="text-xs font-sans font-extrabold text-gray-900">
                  by ADMISSIONS
                </strong>{" "}
                <span className="text-xs font-sans text-gray-900">
                  &nbsp;GATEWAY
                </span>
              </span>
            </Link>
          </div>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-semibold text-gray-900 hover:text-gray-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
