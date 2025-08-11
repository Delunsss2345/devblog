"use client";
import { verifyEmail } from "@/actions/auth/email-verification";
import Alert from "@/components/common/Alert";
import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Lấy các tham số truy vấn từ URL
  const token = searchParams.get("token"); // Lấy giá trị của
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    verifyEmail(token).then((res) => {
      setSuccess(res.success);
      setError(res.error);
    });
    setLoading(false);
  }, [token]);

  return (
    <div className="mt-10 w-100 mx-auto space-y-6 p-2">
      <Heading title="Xác thực email" center />
      {loading && <p className="block text-center">Đang xác thực email...</p>}
      {success && <Alert message={success} success />}
      {success && (
        <Button
          className="mx-auto mt-4"
          type="submit"
          label="Đăng nhập"
          onClick={() => router.push("/login")}
        />
      )}
      {error && <Alert message={error} error />}
    </div>
  );
};

export default VerifyEmailPage;
