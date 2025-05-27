import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [register, { isLoading }] = useRegisterMutation();

  const { first_name, last_name, email, password, re_password } = formData;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    register({ first_name, last_name, email, password, re_password })
      .unwrap()
      .then(() => {
        toast.success(
          "Registration successful! Please check your email to verify the account."
        );
        router.push("/auth/login");
      })
      .catch(() => {
        toast.error("Registration failed. Please try again.");
      });
  };

  return {
    onChange,
    onSubmit,
    isLoading,
    first_name,
    last_name,
    email,
    password,
    re_password,
  };
}
