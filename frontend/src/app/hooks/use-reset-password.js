import { useRouter } from "next/navigation";
import { useState } from "react";
import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useRegister() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    resetPassword(email)
      .unwrap()
      .then(() => {
        toast.success(
          "Please check your email for a password-reset link. If you don't see it, check your spam folder."
        );
      })
      .catch(() => {
        toast.error("Failed to send password reset email. Please try again.");
      });
  };

  return {
    onChange,
    onSubmit,
    isLoading,
    email,
  };
}
