"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/user";
import { LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchemaType) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Tài khoản hoặc mật khẩu sai" };
  }

  const { email, password } = validateFields.data;

  const user = await getUserByEmail(email);
  if (!user || !email || !password || !user.password)
    return { error: "Tài khoản không tồn tại" };

  // if (!user.emailVerified) {
  //   return { error: "Email chưa xác minh" };
  // }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: LOGIN_REDIRECT,
    });
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
