import React, { useState, useEffect } from 'react';
import './App.css';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.nav') && !event.target.closest('.links')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav className="nav">
      <div>Logo</div>
      <div className="triagram" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>
      <div className={`links ${isOpen ? 'open' : ''}`}>
        <span className="close-btn" onClick={() => setIsOpen(false)}>&times;</span>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </nav>
  );
}

export default NavBar;
