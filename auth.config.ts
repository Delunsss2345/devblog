import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { getUserByEmail } from "./lib/user";
import { LoginSchema } from "./schemas/LoginSchema";
export default {
  providers: [
    GitHub({
      clientId: process.env.CLIENT_GITHUB_ID,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const isPassword = await bcrypt.compare(password, user.password);

          if (isPassword) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig; // kiểm tra đúng kiểu không nếu sai báo lỗi
// NextAuthConfig chứa config của nextAuth kế thừa AuthConfig
