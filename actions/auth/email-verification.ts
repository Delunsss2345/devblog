// giúp không cố import code vô trong component nếu gọi
"use server";
import db from "@/lib/db";
import { verifyEmailToken } from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";

export const verifyEmail = async (token: string) => {
  const emailVerificationToken = await db.emailVerifiedToken.findUnique({
    where: { token },
  });

  if (!emailVerificationToken) return { error: "Xác thực email thất bại" };

  const isExpired = emailVerificationToken.expires < new Date();
  if (isExpired) return { error: "Xác thực email đã hết hạn" };


  const existUser = await getUserByEmail(emailVerificationToken.email);
  if (!existUser) return { error: "Người dùng không tồn tại" };

  

  const result = await verifyEmailToken(token);
  if (!result) return { error: "Xác thực email thất bại" };
  return { success: "Xác thực email thành công" };
};
