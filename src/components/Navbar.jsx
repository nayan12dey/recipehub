"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Recipes", href: "/recipes" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-md">
                🍳
              </div>

              <span className="text-xl md:text-2xl font-extrabold text-gray-800">
                RecipeHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-orange-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex justify-end items-center">

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-orange-500 text-orange-500 font-medium hover:bg-orange-50 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all duration-300 shadow-md"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X size={28} className="text-gray-800" />
              ) : (
                <Menu size={28} className="text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="flex flex-col px-4 py-4 space-y-4">

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 font-medium hover:text-orange-500 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons */}
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-orange-500 text-orange-500 font-medium hover:bg-orange-50 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition shadow-md"
              >
                Register
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}

