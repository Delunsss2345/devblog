"use client";
import { login } from "@/actions/auth/login";
import SocialAuth from "@/components/auth/SocialAuth";
import Button from "@/components/common/Button";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/Heading";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "../common/Alert";
const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) }); // zodResolver tạo validate tự động theo loginSchema

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          setError(res.error);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8  gap-2"
    >
      <Heading title="Đăng nhập vào DEV.blog" lg center />
      <FormField
        id="email"
        register={register}
        errors={errors}
        placeholder="email"
      />
      <FormField
        id="password"
        register={register}
        errors={errors}
        placeholder="password"
        type="password"
      />
      <Button
        type="submit"
        label={isPending ? "Đăng đăng nhập" : "Đăng nhập"}
        outlined
        disabled={isPending}
      />
      {error && <Alert error message={error} />}
      <div className="flex justify-center my-2">hoặc</div>
      <div className="flex justify-center">
        <SocialAuth />
      </div>
    </form>
  );
};

export default LoginForm;
