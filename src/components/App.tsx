import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './Theme-context';
import { MdDarkMode, MdOutlineDarkMode, MdOutlineSearch } from "react-icons/md";

const App: React.FC = () => {

  const {theme, toggleTheme} = useTheme();
  const darkModeIcon = theme === 'light' ? (<MdOutlineDarkMode/>) : ( <MdDarkMode/>)
  

  return (
    <div className={`font-Nunito 
    ${theme === "light" ? 'bg-VeryLightGray' : 'bg-VeryDarkBlue text-White'} scroll-smooth h-screen`}>
      <header className={`flex items-center py-8 px-5 shadow shadow-DarkBlue/15
        ${theme === "light" ? "bg-White" : "bg-DarkBlue"}`}
      >
        <h1 className='text-xl font-semibold'>Where in the world?</h1>
        <button 
          type='button'
          onClick={toggleTheme}
          className='flex items-center ml-auto gap-1 text-base'
        >
          {darkModeIcon}{theme === "light" ? "Light" : "Dark"} Mode</button>
      </header>
      <form action="" className='px-5 pt-10'>
        <label  htmlFor="search" className='relative flex items-center text-DarkGray'>
          <button  
            type='submit' 
            title='search' 
            name='search'
            className='absolute left-5'
          >
            <MdOutlineSearch className='size-8'/>
          </button>
          <input 
            id='search' 
            title='search for a country' 
            type="search"
            placeholder='Search for a country...'
            className={`pl-[75px] pr-4 py-3 w-full text-lg shadow-md shadow-DarkGray/15 rounded-lg
              `} 
          />
        </label>
      </form>
    </div>

    
  );
};
export default App;
