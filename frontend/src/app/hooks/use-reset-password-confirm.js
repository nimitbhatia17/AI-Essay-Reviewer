import { useRouter } from "next/navigation";
import { useState } from "react";
import { useResetPasswordConfirmMutation } from "@/redux/features/authApiSlice";
import { toast } from "react-toastify";

export default function useResetPasswordConfirm(uid, token) {
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const { new_password, re_new_password } = formData;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    resetPasswordConfirm({ uid, token, new_password, re_new_password })
      .unwrap()
      .then(() => {
        toast.success(
          "Password reset successfully. You can now log in with your new password."
        );
        router.push("/auth/login");
      })
      .catch(() => {
        toast.error("Failed to reset. Please try again.");
      });
  };

  return {
    onChange,
    onSubmit,
    isLoading,
    new_password,
    re_new_password,
  };
}
