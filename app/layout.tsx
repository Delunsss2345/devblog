import { auth } from "@/auth";
import NavBar from "@/components/layouts/NavBar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Cấu hình tiêu đề
export const metadata: Metadata = {
  title: "DevBlog",
  description: "You favorite dev blogs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "antialiased flex flex-col min-h-screen",
            poppins.variable
          )}
        >
          <ThemeProvider
            attribute={"class"} //Thêm class tương đương với .classList.add('dark')
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="flex-grow">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
