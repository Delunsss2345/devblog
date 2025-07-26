import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Notification = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <div className="absolute size-4 rounded-full bg-rose-500 flex items-center justify-center -top-1 -right-1">
          <span className="dark:text-white">5</span>
        </div>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[100%] max-w-[400px]">
        <div className="flex items-center gap-4 justify-between p-2 mb-2">
          <h3 className="font-bold text-lg">Thông báo</h3>
          <button>Đánh dấu đọc hết</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
