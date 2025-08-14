'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Home, User, Settings, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function FuturisticHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const navItems = [
    { icon: Home, label: 'Accueil', href: '/' },
    { icon: User, label: 'Profil', href: '/dashboard' },
    { icon: Mail, label: 'Contact', href: '/contact' },
    { icon: Settings, label: 'Paramètres', href: '/settings' },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-400/70 hover:scale-110 transition-all duration-300"
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'top-3 rotate-45' : 'top-1'
            }`}
          />
          <span
            className={`absolute left-0 top-3 w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute left-0 w-full h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'top-3 -rotate-45' : 'top-5'
            }`}
          />
        </div>
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/90 via-yellow-800/90 to-yellow-700/90 backdrop-blur-md" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Navigation Content */}
        <div
          className={`relative z-10 flex flex-col items-center justify-center h-full transition-all duration-500 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="space-y-8">
            {/* Theme Toggle */}
            <div className="flex justify-center mb-8">
              <button
                onClick={toggleTheme}
                className="p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/50 hover:shadow-yellow-400/70 hover:scale-110 transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <Sun className="w-6 h-6 text-white" />
                ) : (
                  <Moon className="w-6 h-6 text-white" />
                )}
              </button>
            </div>

            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-400/30 hover:from-yellow-400/30 hover:to-yellow-500/30 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 group`}
                >
                  <item.icon className="w-6 h-6 text-yellow-300 group-hover:text-yellow-200 transition-colors" />
                  <span className="text-white font-medium text-lg group-hover:text-yellow-100 transition-colors">
                    {item.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    </>
  );
}
