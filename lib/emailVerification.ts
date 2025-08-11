import { Resend } from "resend";
import { v4 } from "uuid";
import db from "./db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.emailVerifiedToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  try {
    const token = v4(); // UUID

    const existingToken = await db.emailVerifiedToken.findFirst({
      where: {
        email,
      },
    });

    if (existingToken) {
      await db.emailVerifiedToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const emailVerificationToken = await db.emailVerifiedToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    return emailVerificationToken;
  } catch (error) {
    return null;
  }
};

export const verifyEmailToken = async (token: string) => {
  try {
    const emailVerificationToken = await db.emailVerifiedToken.findFirst({
      where: { token, expires: { gt: new Date() } },
    });

    if (!emailVerificationToken) {
      return null; // Token không hợp lệ hoặc đã hết hạn
    }
    // Cập nhật trạng thái email đã xác thực
    await db.user.update({
      where: { email: emailVerificationToken.email }, // đổi từ id sang email
      data: { emailVerified: new Date() },
    });

    // Xoá token đã sử dụng
    await db.emailVerifiedToken.delete({
      where: { id: emailVerificationToken.id },
    });

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendEmailVerification = async (email: string, token: string) => {
  const resend = new Resend(process.env.API_KEY_RESEND);
  const emailVerificationLink = `${process.env.BASE_URL}/verify-email?token=${token}`;
  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Xác thực email",
    html: `<p>Click vào đây để xác thực email:</p>
           <a href="${emailVerificationLink}">Xác thực email</a>`,
  });

  return { error: res.error };
};
