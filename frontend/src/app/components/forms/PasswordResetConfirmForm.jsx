"use client";

import { useResetPasswordConfirm } from "@/app/hooks";
import { Form } from "@/app/components/forms";

export default function PasswordResetConfirmForm({ uid, token }) {
  const { onChange, onSubmit, isLoading, new_password, re_new_password } =
    useResetPasswordConfirm(uid, token);

  const config = [
    {
      label: "New Password",
      type: "password",
      labelId: "new_password",
      value: new_password,
      required: true,
    },
    {
      label: "Confirm New Password",
      type: "password",
      labelId: "re_new_password",
      value: re_new_password,
      required: true,
    },
  ];
  return (
    <>
      <Form
        config={config}
        buttonText="Reset Password"
        onChange={onChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
