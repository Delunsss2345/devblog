"use server";
import db from "@/lib/db";
import {
  generateEmailVerificationToken,
  sendEmailVerification,
} from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";

export const signUp = async (values: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(values); // Hàm này sẽ thử parse và validate dữ liệu values theo schema.
  // {
  //   success: true,   // hoặc false
  //   data: ... ,      // dữ liệu đã parse (nếu success)
  //   error: ...       // thông tin lỗi (nếu fail)
  // }
  if (!validateFields.success) {
    return { error: "Không có field" };
  }

  const { name, email, password, confirmPassword } = validateFields.data;

  const user = await getUserByEmail(email);
  if (user) {
    return { error: "Email đã được dùng" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // Gửi email xác nhận (nếu cần)
  const emailVerificationToken = await generateEmailVerificationToken(email);
  if (!emailVerificationToken) {
    return { error: "Không thể xác thực email" };
  }
  await sendEmailVerification(email, emailVerificationToken.token);
  return { success: "Đã gửi email xác thực tài khoản thành công" };
};
