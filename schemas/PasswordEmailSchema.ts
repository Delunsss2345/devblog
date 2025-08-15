import { z } from "zod";

export const PasswordEmailSchema = z.object({
  email: z.string().email({ message: "Email sai định dạng" }),
});

export type PasswordEmailSchemaType = z.infer<typeof PasswordEmailSchema>; // infer tạo ra type giống với object mẫu
