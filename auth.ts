import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import { getUserByEmail } from "./lib/user";

declare module "next-auth" {
  interface Session {
    user: {
      role: "USER" | "ADMIN";
      userId: string;
    } & DefaultSession["user"];
  }
}

// /api/auth/provider cung cấp toàn bộ xác thực mà mình xài
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db), // truyền vào db để nextAuth kết nối (dùng để lưu session ,user)
  session: { strategy: "jwt" },
  ...authConfig,
  // sẽ được gọi khi User đăng nhập lần đầu bằng OAuth (Google, GitHub, v.v.).
  // events là nơi để xử lý các sự kiện liên quan đến xác thực , ví dụ như xác thực email ,
  // xác thực số điện thoại
  events: {
    // hàm này có tác dụng là khi user liên kết tài khoản mới thì sẽ tự động xác thực email
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }, // verify email nếu user đã xác thực
      });
    },
  },
  // TODOS : chưa hiểu code lắm 
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;

      const user = await getUserByEmail(token.email);

      if (!user) return token;

      token.role = user.role; // gán role cho token
      token.userId = user.id as string; // gán userId cho token

      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as "USER" | "ADMIN"; // gán role cho session
      }

      if (token.userId) {
        session.user.id = token.userId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // gặp lỗi redirect về trang đăng nhập
  },
});
