'use client'

import { useState } from 'react';

export default function Logo() {
  const [isLogoOutlined, setIsLogoOutlined] = useState(false);
  
  return (
    <>
      <img 
        src='nommo_filled.svg' 
        alt="Nommo Logo Filled"
        style={{
          opacity: isLogoOutlined ? 0 : 1,
          width: "500px",
          maxWidth: "90%",
          transition: "opacity 0.8s ease-in",
          zIndex: 10,
          mixBlendMode: 'difference',
          position: 'absolute'
        }} 
        className="logo_header_filled" 
        onMouseEnter={() => setIsLogoOutlined(true)} 
        onMouseLeave={() => setIsLogoOutlined(false)}
      />
      <img 
        src='nommo_outline.svg' 
        alt="Nommo Logo Outlined"
        style={{
          opacity: isLogoOutlined ? 1 : 0,
          width: "500px",
          maxWidth: "90%",
          transition: "opacity 1.1s ease-in",
          zIndex: 10,
        }} 
        className="logo_header_outlined" 
        onMouseEnter={() => setIsLogoOutlined(true)} 
        onMouseLeave={() => setIsLogoOutlined(false)}
      />
    </>
  );
} 