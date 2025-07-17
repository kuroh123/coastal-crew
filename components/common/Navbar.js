'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { verifyToken } from '@/lib/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressBook,
  faBars,
  faBook,
  faCalendarAlt,
  faCog, 
  faPhone,
  faSignOutAlt,
  faTimes,
  faUserCircle,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        setUser(decoded);
      }
    }
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full backdrop-blur-sm bg-black/10 border border-white/20 shadow-md px-6 py-2 flex justify-between items-center">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center text-white text-lg font-bold transition-all duration-300">
          <span className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" className="h-8 w-auto transition-all duration-300" />
            <span className="text-xl">Sproutify</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/events" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5" /> 
            <span>Events</span>
          </Link>
          <Link href="/about" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faAddressBook} className="h-5 w-5" /> 
            <span>About Us</span>
          </Link>
          <Link href="/contact" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faPhone} className="h-5 w-5" /> 
            <span>Contact</span>
          </Link>
          <Link href="/resources" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
            <FontAwesomeIcon icon={faBook} className="h-5 w-5" /> 
            <span>Resources</span>
          </Link>
        </div>

        {/* User options */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-white text-sm">Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <Link href="/admin/dashboard" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
                  <FontAwesomeIcon icon={faCog} className="h-5 w-5" /> 
                  <span>Admin</span>
                </Link>
              )}
              {user.role === 'volunteer' && (
                <Link href="/volunteer/dashboard" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
                  <FontAwesomeIcon icon={faUserShield} className="h-5 w-5" /> 
                  <span>Volunteer</span>
                </Link>
              )}
              <a href="#" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200"
                 onClick={() => {
                   localStorage.removeItem('token');
                   setUser(null);
                 }}>
                <FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5" /> 
                <span>Logout</span>
              </a>
            </>
          ) : (
            <Link href="/login" className="text-white flex items-center space-x-1 hover:text-gray-300 transition-colors duration-200">
              <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5" /> 
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden text-white focus:outline-none transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-4 items-center mt-4 transition-all duration-300">
          <Link href="/events" className="text-white"><FontAwesomeIcon icon={faCalendarAlt} className="h-5 w-5 mr-2" /> Events</Link>
          <Link href="/about" className="text-white">About Us</Link>
          <Link href="/contact" className="text-white">Contact</Link>
          <Link href="/resources" className="text-white"><FontAwesomeIcon icon={faBook} className="h-5 w-5 mr-2" /> Resources</Link>
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <Link href="/admin/dashboard" className="text-white"><FontAwesomeIcon icon={faCog} className="h-5 w-5 mr-2" /> Admin</Link>
              )}
              {user.role === 'volunteer' && (
                <Link href="/volunteer/dashboard" className="text-white"><FontAwesomeIcon icon={faUserShield} className="h-5 w-5 mr-2" /> Volunteer</Link>
              )}
              <a href="#" className="text-white"
                 onClick={() => {
                   localStorage.removeItem('token');
                   setUser(null);
                 }}><FontAwesomeIcon icon={faSignOutAlt} className="h-5 w-5 mr-2" /> Logout</a>
            </>
          ) : (
            <Link href="/login" className="text-white"><FontAwesomeIcon icon={faUserCircle} className="h-5 w-5 mr-2" /> Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;