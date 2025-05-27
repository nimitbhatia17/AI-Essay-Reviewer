"use client";

import { Form } from "@/app/components/forms";
import { useResetPassword } from "@/app/hooks";

export default function PasswordResetForm() {
  const { onChange, onSubmit, isLoading, email } = useResetPassword();

  const config = [
    {
      labelId: "email",
      type: "email",
      label: "Email Address",
      value: email,
      required: true,
    },
  ];

  return (
    <>
      <Form
        config={config}
        isLoading={isLoading}
        buttonText="Request Password Reset"
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
