"use client";

import { useRegister } from "@/app/hooks";
import { Form } from "@/app/components/forms";

export default function RegisterForm() {
  const {
    onChange,
    onSubmit,
    isLoading,
    first_name,
    last_name,
    email,
    password,
    re_password,
  } = useRegister();

  const config = [
    {
      labelId: "first_name",
      type: "text",
      label: "First Name",
      value: first_name,
      required: true,
    },
    {
      labelId: "last_name",
      type: "text",
      label: "Last Name",
      value: last_name,
      required: true,
    },
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
    },
    {
      labelId: "re_password",
      type: "password",
      label: "Confirm Password",
      value: re_password,
      required: true,
    },
  ];

  return (
    <>
      <Form
        config={config}
        isLoading={isLoading}
        buttonText="Sign up"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
