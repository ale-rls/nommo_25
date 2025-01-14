'use client'

import { useState } from 'react';
import Image from 'next/image';

export default function Logo() {
  const [isLogoOutlined, setIsLogoOutlined] = useState(false);
  
  return (
    <>
      <Image 
        src='/nommo_filled.svg' 
        alt="Nommo Logo Filled"
        width={500}
        height={500}
        style={{
          opacity: isLogoOutlined ? 0 : 1,
          maxWidth: "90%",
          position: "absolute",
          transition: "opacity 0.8s ease-in",
          zIndex: 10,
          mixBlendMode: 'difference',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} 
        className="logo_header_filled" 
        onMouseEnter={() => setIsLogoOutlined(true)} 
        onMouseLeave={() => setIsLogoOutlined(false)}
        priority
      />
      <Image 
        src='/nommo_outline.svg' 
        alt="Nommo Logo Outlined"
        width={500}
        height={500}
        style={{
          opacity: isLogoOutlined ? 1 : 0,
          maxWidth: "90%",
          position: "absolute",
          transition: "opacity 1.1s ease-in",
          zIndex: 10,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }} 
        className="logo_header_outlined invert-svg" 
        onMouseEnter={() => setIsLogoOutlined(true)} 
        onMouseLeave={() => setIsLogoOutlined(false)}
        priority
      />
    </>
  );
} 