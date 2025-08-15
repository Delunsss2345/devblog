"use client";
import { login } from "@/actions/auth/login";
import SocialAuth from "@/components/auth/SocialAuth";
import Button from "@/components/common/Button";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/Heading";
import { LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Alert from "../common/Alert";
import Link from "next/link";
const LoginForm = () => {
  const searchParams = useSearchParams(); // Lấy các tham số truy vấn từ URL
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const router = useRouter(); // điểu khiên router hiện tại
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) }); // zodResolver tạo validate tự động theo loginSchema

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email đã được dùng cho tài khoản khác"
      : ""; // Lấy giá trị của tham số "error"
  // OAuthAccountNotLinked là khi người dùng cố gắng đăng nhập bằng tài khoản
  // OAuth, nhưng đã có 1 tài khoản credentials, và tài khoản đó chưa được xác thực email.
  // hoặc loại oauth đang dùng

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
    setError("");
    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          router.replace("/login"); // Chuyển hướng về trang đăng nhập nếu có lỗi()
          setError(res.error);
        }

        if (res?.success) {
          console.log("Đăng nhập thành công");
          router.push(LOGIN_REDIRECT); // Chuyển hướng về trang chủ nếu đăng nhập thành công
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
        label={isPending ? "Đang đăng nhập..." : "Đăng nhập"}
        outlined
        disabled={isPending}
      />
      {error && <Alert error message={error} />}
      {success && <Alert success message={success} />}
      {urlError && <Alert error message={urlError} />}
      <p className="flex justify-center"><Link href="/forgot-password">Bạn đã quên mật khẩu?</Link></p>
      <div className="flex justify-center my-2">hoặc</div>
      <div className="flex justify-center">
        <SocialAuth />
      </div>
    </form>
  );
};

export default LoginForm;
