import NavBar from "@/components/layouts/NavBar";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased flex flex-col min-h-screen",
          poppins.variable
        )}
      >
        <SessionProvider>
          <EdgeStoreProvider>
          <ThemeProvider
            attribute={"class"} //Thêm class tương đương với .classList.add('dark')
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
          </ThemeProvider>
          </EdgeStoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
