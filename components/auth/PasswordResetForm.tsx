"use client";
import Button from "@/components/common/Button";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/Heading";
import {
  PasswordResetSchema,
  PasswordResetSchemaType,
} from "@/schemas/PasswordResetSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "../common/Alert";
const PasswordResetForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
  });

  const onSubmit: SubmitHandler<PasswordResetSchemaType> = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {});
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8  gap-2"
    >
      <Heading title="Nhập mật khẩu mới" lg center />
      <FormField
        id="password"
        register={register}
        errors={errors}
        placeholder="Mật khẩu mới"
        type="password"
      />
      <FormField
        id="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Xác nhận mật khẩu mới"
        type="password"
      />
      <Button
        type="submit"
        label={isPending ? "Đang đổi mật khẩu..." : "Đổi mật khẩu"}
        outlined
        disabled={isPending}
      />
      {error && <Alert error message={error} />}
      {success && <Alert success message={success} />}
    </form>
  );
};

export default PasswordResetForm;
