import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disable?: boolean;
  placeholder: string;
  label?: string;
  inputClassName?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors; // FieldErrors<T mặc đình là { [key: string]: any }> dùng để bắt lỗi
}
const FormField = <T extends FieldValues>({
  id,
  type,
  disable,
  placeholder,
  label,
  inputClassName,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);
  return (
    <div>
      {label && <span className="block text-sm ">{label}</span>}
      <input
        id={id}
        disabled={disable}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)} // Path đảm bảo id có tên field thuộc LoginValues
        className={cn(
          "w-full p-3 my-2 outline-none rounded-md disabled:opacity-70 disabled:cursor-not-allowed border border-slate-300 dark:border-slate-700",
          errors[id] && "border-rose-400",
          inputClassName
        )}
      />
      {message && <span className="text-sm text-rose-400 ">{message}</span>}
    </div>
  );
};

export default FormField;
