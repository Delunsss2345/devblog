import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Tên ít nhất 2 từ" })
      .max(50, { message: "Tối đa 50 từ" }),
    email: z.string().email({ message: "Email sai định dạng" }),
    password: z.string().min(6, { message: "Mật khẩu tối thiếu 6 ký tự" }),
    confirmPassword: z.string(),
  })
  .refine( //refine dùng một hàm values gồm các giá trị trong object 
    (values) => {
      return values.password === values.confirmPassword;
    },
    { message: "Mật khẩu xác nhận không khớp", path: ["confirmPassword"] } //path: ["confirmPassword"]  chỉ ra lỗi ở confirmPassword
  );
export type RegisterSchemaType = z.infer<typeof RegisterSchema>; // infer tạo ra type giống với object mẫu
