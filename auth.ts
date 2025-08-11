import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
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
  pages: {
    signIn: "/login", // gặp lỗi redirect về trang đăng nhập
  },
});
