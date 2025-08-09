"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MdNoteAlt } from "react-icons/md";
import Container from "./Container";
import Notification from "./Notification";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
  const session = useSession(); // lấy session (refresh khi có cookie session thay đổi)
  const isLoggedIn = session.status === "authenticated";
  console.log(isLoggedIn);
  const path = usePathname(); // lấy path bao gồm sau tên miền chính không gồm query (/products/details)
  // client-side reactive hook là useState, useEffect, usePathname, useSession
  // ví dụ usePathname lắng nghe url , nếu url đổi nó sẽ re-render lại components (get path mới)
  useEffect(() => {
    if (isLoggedIn && path) {
      const updateSession = async () => {
        await session.update();
      };

      updateSession();
    }
  }, [path, isLoggedIn]);
  // { // logout thì data null
  //   data : {
  //     user : {

  //     } ,
  //     expires : ...
  //   } ,
  // status : 'authenticated'
  // }
  return (
    <nav className="sticky top-0 py-1 border-b z-50">
      <Container>
        <div className="flex justify-between items-center p-2">
          <div className="flex items-center gap-1 cursor-pointer">
            <MdNoteAlt size={20} />
            <div className="font-bold text-xl">DEV.blog</div>
          </div>
          <SearchInput />

          <div className="flex gap-5 sm:gap-8 items-center">
            <ThemeToggle />
            {isLoggedIn && <Notification />}
            {isLoggedIn && <UserAvatar />}
            {!isLoggedIn && (
              <>
                <Link href="/login">Đăng nhập</Link>
                <Link href="/register">Đăng ký</Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
