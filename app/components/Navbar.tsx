"use client";

import { useState, useEffect } from 'react';
import './Navbar.css';

interface NavbarProps {
  setParagraphColor: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setParagraphColor }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontType, setFontType] = useState('');
  const [color, setColor] = useState('');

  const dropDownMenu = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const activateDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const changeFont = (font: string) => {
    setFontType(font);
    setDropdownOpen(!dropdownOpen);
  };

  const changeParagraphColor = (color: string) => {
    setParagraphColor(color);
    setColor(color);
  };

  useEffect(() => {
    document.body.className = fontType;
  }, [fontType]);

  useEffect(() => {
    if(darkMode){
      changeParagraphColor('white');
      document.body.className = 'darkModeActive';
    }else{
      changeParagraphColor('black');
      document.body.className = 'darkModeNoActive';
    }
  }, [darkMode]);


  const renderIcons =()=>{
    if(darkMode){
      return(
        <>
        <img src={"https://img.icons8.com/?size=100&id=RUaoB2EaIXI6&format=png&color=000000"} alt="" />
        </>
      )
    }else{
      return(
        <>
        <img src={"https://img.icons8.com/?size=100&id=xGVn5Y7qXP4H&format=png&color=000000"} alt="" />
        </>
      )
    }
  }

  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-between items-center" id='nav'>
      <div className="text-white">
        <svg
          className="h-3.5 w-3.5 rounded-full me-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4V12m0 8v-8m0 8l8-8m-8 0L4 4"
          ></path>
        </svg>
      </div>
      <div className="flex items-center space-x-4" id='nav-items'>
        <div className="relative">
          <button
            onClick={dropDownMenu}
            className="btn-drop bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
            style={{color: color}}
          >
            {fontType ? fontType[0]?.toUpperCase() + fontType.slice(1) : 'Tipo fuente'}
          </button>
          {dropdownOpen && (
            <div className="drop-list right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20" style={{color: color}}>
              <button onClick={() => changeFont('sans-serif')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Sans-serif
              </button>
              <button onClick={() => changeFont('serif')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Serif
              </button>
              <button onClick={() => changeFont('monospace')} className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Monospace
              </button>
            </div>
          )}
        </div>
        <div className="switch-icon">
          <label className="switch">
            <input type="checkbox" onChange={activateDarkMode} checked={darkMode} />
            <span className="slider round"></span>
          </label>
          {renderIcons()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
