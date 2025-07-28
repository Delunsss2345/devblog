import { cn } from "@/lib/utils";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
const Alert = ({
  success,
  error,
  message,
}: {
  success?: boolean;
  error?: boolean;
  message: string | undefined;
}) => {
  return (
    <div
      className={cn(
        "my-2 flex items-center gap-2 p-3 rounded-sm",
        error && "bg-red-100 text-rose-500",
        success && "bg-green-100 text-green-500",
        !success && !error && "bg-blue-100 text-blue-500"
      )}
    >
      <span>
        {success && <FaCheckCircle size={20} />}
        {error && <MdError size={20} />}
        {!error && !success && <IoMdInformationCircle size={20} />}
      </span>
      {message}
    </div>
  );
};

export default Alert;
