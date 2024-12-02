import React from 'react';
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

type HeaderProps = {
  theme: string;
  toggled: () => void;
  elementTheme: string;
};

export const Header: React.FC<HeaderProps> = ({ theme, toggled, elementTheme }) => {
  const darkModeIcon = theme === 'light' ? <MdOutlineDarkMode /> : <MdDarkMode /> ;
 
  return (
    <header className={`flex items-center py-8 px-6 md:px-12 lg:py-5 lg:px-[76px] xxl:px-[100px] ${elementTheme}`}>
      <h1 className="text-base font-bold ">Where in the world?</h1>
      <button
        type="button"
        onClick={toggled}
        className="flex items-center ml-auto gap-1 text-base font-bold "
      >
        {darkModeIcon}
        {theme === "light" ? "Light" : "Dark"} Mode
      </button>
    </header>
  );
};
