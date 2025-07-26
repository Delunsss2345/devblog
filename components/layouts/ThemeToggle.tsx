"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button onClick={toggleMode}>
      <Moon className="dark:hidden block" />
      <Sun className="hidden dark:block" />
    </button>
  );
};

export default ThemeToggle;
