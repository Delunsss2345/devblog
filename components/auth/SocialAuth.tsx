import Button from "@/components/common/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
  return (
    <div className="flex gap-2 flex-col md:flex-row">
      <Button
        type="button"
        label="Tiếp tục với Github"
        outlined
        icon={FaGithub}
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
