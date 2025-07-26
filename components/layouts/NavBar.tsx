import Link from "next/link";
import { MdNoteAlt } from "react-icons/md";
import Container from "./Container";
import Notification from "./Notification";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

const NavBar = () => {
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
            <Notification />
            <UserAvatar />
            <>
              <Link href="/login">Đăng nhập</Link>
              <Link href="/register">Đăng ký</Link>
            </>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
