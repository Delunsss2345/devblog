"use client";

import { signUp } from "@/actions/auth/register";
import SocialAuth from "@/components/auth/SocialAuth";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/Heading";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const RegisterForm = () => {
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    setError("");
    setSuccess("");

    setTransition(() => {
      signUp(data).then((res) => {
        if (res.success) {
          setSuccess(res.success);
        } else {
          setError(res?.error);
        }
      });
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8  gap-2"
    >
      <Heading title="Đăng ký vào DEV.blog" lg center />

      <FormField
        id="name"
        placeholder="name"
        register={register}
        errors={errors}
        disable={isPending}
      />
      <FormField
        id="email"
        placeholder="email"
        register={register}
        errors={errors}
        disable={isPending}
      />
      <FormField
        type="password"
        id="password"
        placeholder="password"
        register={register}
        errors={errors}
        disable={isPending}
      />
      <FormField
        type="password"
        id="confirmPassword"
        placeholder="confirmPassword"
        register={register}
        disable={isPending}
        errors={errors}
      />
      <Button
        label={isPending ? "Đang tạo..." : "Đăng ký"}
        disabled={isPending}
        type="submit"
        outlined
      />
      {error && <Alert error message={error} />}
      {success && <Alert success message={error} />}
      <div className="flex justify-center my-2">hoặc</div>
      <div className="flex justify-center">
        <SocialAuth />
      </div>
    </form>
  );
};

export default RegisterForm;
