import { Metadata } from "next";

// Cấu hình tiêu đề
export const metadata: Metadata = {
  title: "AuthDevBlog",
  description: "You favorite dev blogs",
};

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      <nav>Auth nav</nav>
      {children}
    </div>
  );
};

export default AuthLayout;
