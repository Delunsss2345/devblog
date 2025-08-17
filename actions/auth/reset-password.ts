"use server";
import db from "@/lib/db";
import {
  resetPasswordVerification,
  sendPasswordResetEmail,
} from "@/lib/passwordResetToken";
import { getUserByEmail } from "@/lib/user";

export const resetPassword = async (token: string, password: string) => {
  const resetPasswordToken = await db.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetPasswordToken) return { error: "Mã xác thực không hợp lệ" };

  const isExpired = resetPasswordToken.expires < new Date();
  if (isExpired) return { error: "Mã xác thực đã hết hạn" };

  const existUser = await getUserByEmail(resetPasswordToken.email);
  if (!existUser) return { error: "Người dùng không tồn tại" };

  const result = await resetPasswordVerification(token, password);
  if (!result) return { error: "Thay đổi mật khẩu thất bại" };
  return { success: "Thay đổi mật khẩu thành công" };
};

export const sendResetPasswordEmail = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user || !user.email) return { error: "Người dùng không tồn tại" };

  // Gửi email đặt lại mật khẩu
  await sendPasswordResetEmail(user.email);

  return { success: "Đã gửi email đặt lại mật khẩu" };
};
