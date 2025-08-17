"use client";
import { sendResetPasswordEmail } from "@/actions/auth/reset-password";
import Button from "@/components/common/Button";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/Heading";
import {
  PasswordEmailSchema,
  PasswordEmailSchemaType,
} from "@/schemas/PasswordEmailSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "../common/Alert";
const PasswordEmailForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordEmailSchemaType>({
    resolver: zodResolver(PasswordEmailSchema),
  }); // zodResolver tạo validate tự động theo loginSchema

  const onSubmit: SubmitHandler<PasswordEmailSchemaType> = (data) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      //FIXED : fix send password chưa fix được
      sendResetPasswordEmail(data.email).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess("Đã gửi email đặt lại mật khẩu");
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8  gap-2"
    >
      <Heading title="Bạn quên mật khẩu ?" md center />
      <FormField
        id="email"
        register={register}
        errors={errors}
        placeholder="email"
        type="email"
      />
      <Button
        type="submit"
        label={isPending ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
        outlined
        disabled={isPending}
      />
      {error && <Alert error message={error} />}
      {success && <Alert success message={success} />}
    </form>
  );
};

export default PasswordEmailForm;
