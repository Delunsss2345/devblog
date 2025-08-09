import Button from "@/components/common/Button";
import { LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
  const handleOnclick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <Button
        type="button"
        label="Tiếp tục với Github"
        outlined
        icon={FaGithub}
        onClick={() => handleOnclick("github")}
      />
      <Button
        type="button"
        label="Tiếp tục với Google"
        outlined
        icon={FaGoogle}
      />
    </div>
  );
};

export default SocialAuth;
