import db from "./db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    console.warn("[getUserByEmail] User found:", user);
    return user;
  } catch (error) {
    console.error("[getUserByEmail] Error:", error);
    return null;
  }
};
