import { z } from "zod";

export const PasswordResetSchema = z
  .object({
    password: z.string().min(6, { message: "Mật khẩu tối thiếu 6 ký tự" }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: "Mật khẩu xác nhận không khớp", path: ["confirmPassword"] }
  );

export type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>; // infer tạo ra type giống với object mẫu
