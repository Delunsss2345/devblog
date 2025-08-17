"use client";
import { LogOut, Pencil, Shield, User } from "lucide-react";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { signOut, useSession } from "next-auth/react"; // dùng để gửi http request đến server
const UserAvatar = () => {
  const session = useSession(); // lấy session (refresh khi có cookie session thay đổi)
  const imageUrl = session.data?.user?.image; // lấy ảnh từ session
  console.log("UserAvatar", session.data?.user); // log thông tin user để kiểm tra
  return (
    <DropdownMenu>
      {/* Nút mở tắt dropdown */}
      <DropdownMenuTrigger asChild>
        <Avatar className="border dark:border-white border-slate-950">
          <AvatarImage src={imageUrl || ""} alt="User Avatar" />
          <AvatarFallback>
            <User size={15} className="dark:text-white text-slate-950" />{" "}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {/* Cha bọc */}
      <DropdownMenuContent className="w-[100%] max-w-[400px] mt-2">
        {/* Các thẻ con */}
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <User /> Trang cá nhân
          </button>
        </DropdownMenuItem>
        {/* Thẻ gạch button */}
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Pencil /> Viết bài
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <FaRegBookmark /> Lưu
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button className="flex items-center gap-2">
            <Shield /> Quản trị
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button onClick={() => signOut()} className="flex items-center gap-2">
            <LogOut /> Đăng xuất
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
