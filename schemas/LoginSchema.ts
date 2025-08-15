import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email sai định dạng" }),
  password: z.string().min(6, { message: "Mật khẩu tối thiếu 6 ký tự" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>; // infer tạo ra type giống với object mẫu
