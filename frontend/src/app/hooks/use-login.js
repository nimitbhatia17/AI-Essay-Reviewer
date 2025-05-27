import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAuth } from "@/redux/features/authSlice";
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function useRegister() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth());
        toast.success("User Logged In Successfully. Redirecting to home page.");
        router.push("/");
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return {
    onChange,
    onSubmit,
    isLoading,
    email,
    password,
  };
}
