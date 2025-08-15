"use server";
import { signIn } from "@/auth";
import {
  generateEmailVerificationToken,
  sendEmailVerification,
} from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Tài khoản hoặc mật khẩu sai" };
  }
  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if (!user || !email || !password || !user.password) {
    return { error: "Tài khoản không tồn tại" };
  }

  if (!user.emailVerified) {
    // Nếu email chưa được xác minh, trả về lỗi
    const emailVerificationToken = await generateEmailVerificationToken(email);
    if (!emailVerificationToken) {
      return { error: "Không thể xác thực email" };
    }
    const { error } = await sendEmailVerification(
      emailVerificationToken.email,
      emailVerificationToken.token
    );
    if (error) {
      return { error: "Email chưa xác minh" };
    }
    return { success: "Đã gửi email xác minh" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Sai tài khoản hoặc mật khẩu" };
        default:
          return { error: "Vui lòng thử lại" };
      }
    }
  }
};
