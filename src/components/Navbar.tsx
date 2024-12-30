'use client'

import { useTheme } from '../app/ThemeContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const { height, top } = heroSection.getBoundingClientRect();
        const scrollProgress = -top / height;
        setShowLogo(scrollProgress > 0.3);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 right-0 p-6 z-20 flex gap-8 items-center w-full justify-between">
      <div className="relative h-8 w-32">
        <Image 
          src='/nommo_filled.svg' 
          alt="Nommo Logo"
          fill
          className="transition-opacity duration-300 object-contain"
          style={{
            opacity: showLogo ? 0.8 : 0,
            cursor: 'pointer'
          }}
          onClick={() => scrollToSection('hero')}
        />
      </div>
      <div className="flex gap-8 items-center">
        <button
          onClick={() => scrollToSection('video')}
          className="nav-button bg-transparent border-none text-[var(--text)] cursor-pointer text-base relative py-1"
        >
          video
        </button>
        <button
          onClick={() => scrollToSection('contact')}
          className="nav-button bg-transparent border-none text-[var(--text)] cursor-pointer text-base relative py-1"
        >
          contact
        </button>
        <button
          onClick={toggleTheme}
          className="bg-transparent border-none text-[var(--text)] cursor-pointer p-2 flex items-center justify-center transition-transform duration-200 hover:scale-110"
        >
          {theme === 'light' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
} 