import React from 'react'
import { Link } from 'react-router-dom'

export const NavigationLink = ({ to, bg, textColor, text, onClick }) => {
  // Define the click handler
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault(); // Prevent the default navigation
      onClick(); // Trigger the onClick passed as a prop
    }
  };

  return (
    <Link 
      className='navLink' 
      to={to} 
      style={{ background: bg, color: textColor }} 
      onClick={handleClick} // Attach the onClick handler
    >
      {text}
    </Link>
  );
}
