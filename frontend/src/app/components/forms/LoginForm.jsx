"use client";

import { useLogin } from "@/app/hooks";
import { Form } from "@/app/components/forms";

export default function LoginForm() {
  const { onChange, onSubmit, isLoading, email, password } = useLogin();

  const config = [
    {
      labelId: "email",
      type: "email",
      label: "Email Address",
      value: email,
      required: true,
    },
    {
      labelId: "password",
      type: "password",
      label: "Password",
      value: password,
      required: true,
      link: {
        linkUrl: "/forgot-password",
        linkText: "Forgot Password?",
      },
    },
  ];

  return (
    <>
      <Form
        config={config}
        isLoading={isLoading}
        buttonText="Login"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
