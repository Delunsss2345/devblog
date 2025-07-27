"use client";
import SocialAuth from "@/components/auth/SocialAuth";
import Button from "@/components/common/Button";
import FormField from "@/components/common/FormField";
import Heading from "@/components/common/Heading";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) }); // zodResolver tạo validate tự động theo RegisterSchema

  const onSubmit: SubmitHandler<RegisterSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[500px] m-auto mt-8  gap-2"
    >
      <Heading title="Tạo tài khoản DEV.blog" lg center />
      <FormField
        id="name"
        register={register}
        errors={errors}
        placeholder="name"
      />
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
      <FormField
        id="confirmPassword"
        register={register}
        errors={errors}
        placeholder="confirmPassword"
        type="password"
      />
      <Button type="submit" label={"Register"} outlined />
      <div className="flex justify-center my-2">hoặc</div>
      <div className="flex justify-center">
        <SocialAuth />
      </div>
    </form>
  );
};

export default RegisterForm;
