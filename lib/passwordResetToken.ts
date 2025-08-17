import bcrypt from "bcryptjs";
import { Resend } from "resend";
import { v4 } from "uuid";
import db from "./db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
};
//FIXED : Cần fix bảng passwordResetToken lưu dữ liệu vào bảng khi đăng nhập
export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = v4(); // UUID
    // Cầm bổ sung thêm check email có tồn tại k
    const existingToken = await db.passwordResetToken.findFirst({
      where: { email },
    }); // Hiện tại chưa tìm thấy token cũ ở đây

    if (existingToken) {
      await db.passwordResetToken.delete({
        where: { id: existingToken.id },
      });
    }

    const passwordResetToken = await db.passwordResetToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    console.log(passwordResetToken);
    return passwordResetToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const resetPasswordVerification = async (
  token: string,
  password: string
) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { token, expires: { gt: new Date() } },
    });

    if (!passwordResetToken) {
      return null; // Token không hợp lệ hoặc đã hết hạn
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // Cập nhật trạng thái email đã xác thực
    await db.user.update({
      where: { email: passwordResetToken.email }, // đổi từ id sang email
      data: { password: hashPassword },
    });

    // Xoá token đã sử dụng
    await db.passwordResetToken.delete({
      where: { id: passwordResetToken.id },
    });

    return true;
  } catch (error) {
    return null;
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  const passwordResetToken = await generatePasswordResetToken(email);
  if (!passwordResetToken) {
    return { error: "Không thể tạo mới mật khẩu" };
  }
  const token = String(passwordResetToken.token);
  const resend = new Resend(process.env.API_KEY_RESEND);
  const link = `${process.env.BASE_URL}/reset-password?token=${token}`;

  // Bug gửi object chứ không phải gửi link thật
  const res = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Đặt lại mật khẩu",
    html: `<p>Click vào đây để đặt lại mật khẩu:</p>
           <a href="${link}">Đặt lại mật khẩu</a>`,
  });

  if (res.error) {
    return { error: "Không thể gửi email đặt lại mật khẩu" };
  }

  return { success: true };
};
