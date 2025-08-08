import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db), // truyền vào db để nextAuth kết nối (dùng để lưu session ,user)
  session: { strategy: "jwt" },
  ...authConfig,
});
