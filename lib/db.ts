import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient(); //globalThis dùng ở vùng nhớ

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;


