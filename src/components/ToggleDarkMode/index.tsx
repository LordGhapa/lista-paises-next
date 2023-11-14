"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function ToggleDarkMode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? "systemTheme" : theme;
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center">
        {currentTheme === "dark" ? (
          <button
            className="flex w-12 justify-center rounded-md border-2 border-slate-400 bg-slate-500 p-1 hover:bg-gray-900"
            onClick={() => setTheme("light")}
          >
            <Image src="/sun.svg" alt="logo" height="50" width="50" />
          </button>
        ) : (
          <button
            className="bg-black-700 flex w-12 justify-center rounded-md border-2 border-slate-400 p-1 hover:bg-black"
            onClick={() => setTheme("dark")}
          >
            <Image src="/moon.svg" alt="logo" height="50" width="50" />
          </button>
        )}
      </div>
    </>
  );
}
