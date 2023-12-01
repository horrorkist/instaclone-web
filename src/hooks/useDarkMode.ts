import { useEffect, useState } from "react";

function useDarkMode() {
  const [theme, setTheme] = useState(
    localStorage.getItem("instaclone-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("instaclone-theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("instaclone-theme", "light");
    }
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return { theme, toggleTheme };
}

export default useDarkMode;
