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
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <Image
                src="/logo.png"
                alt="Octad Engineering Limited Logo"
                width={32}
                height={32}
              />
            </div>
            <span className="text-2xl font-bold text-primary">Octad Engineering</span>
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
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium transition-colors duration-200 px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 space-y-2">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary bg-gray-50 rounded-md transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <CogIcon className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/admin/login"
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary bg-gray-50 rounded-md transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <CogIcon className="h-4 w-4" />
                    <span>Admin Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
