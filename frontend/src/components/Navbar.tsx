"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon, CogIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo_blue_no_bg.png"
              alt="OCTAD Engineering Logo"
              width={60}
              height={60}
              className="flex-shrink-0 object-contain"
              priority
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary truncate">
              <span className="hidden sm:inline">Octad Engineering</span>
              <span className="sm:hidden">Octad</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 ml-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                    title="Admin Panel"
                  >
                    <CogIcon className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/admin/login"
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                  title="Admin Login"
                >
                  <CogIcon className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative text-gray-700 hover:text-primary focus:outline-none focus:text-primary p-2 -m-2 rounded-md transition-all duration-300 hover:bg-gray-100 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2.5' : 'rotate-0 translate-y-0'
                  }`}></span>
                <span className={`absolute top-1/2 left-0 w-6 h-0.5 bg-current rounded-full transform -translate-y-0.5 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}></span>
                <span className={`absolute bottom-1 left-0 w-6 h-0.5 bg-current rounded-full transform transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2.5' : 'rotate-0 translate-y-0'
                  }`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className={`pb-4 pt-2 border-t border-gray-100 transform transition-all duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-4'
            }`}>
            <div className="flex flex-col space-y-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-primary hover:bg-gray-50 font-medium transition-all duration-300 px-4 py-3 rounded-md mx-2 transform hover:translate-x-2 hover:shadow-sm ${isOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-4 opacity-0'
                    }`}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item.name}</span>
                  </span>
                </Link>
              ))}
              <div className={`px-2 pt-2 mt-2 border-t border-gray-100 transform transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`} style={{ transitionDelay: isOpen ? '250ms' : '0ms' }}>
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200 transform hover:translate-x-1 hover:shadow-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <CogIcon className="h-4 w-4 transition-transform hover:rotate-180" />
                      <span>Admin Panel</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200 transform hover:translate-x-1 hover:shadow-sm"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4 transition-transform hover:-translate-x-0.5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/admin/login"
                    className="flex items-center space-x-2 w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-all duration-200 transform hover:translate-x-1 hover:shadow-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <CogIcon className="h-4 w-4 transition-transform hover:rotate-180" />
                    <span>Admin Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
