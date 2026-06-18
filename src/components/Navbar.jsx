

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
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-xl shadow-md transition-transform duration-300 group-hover:scale-105">
              🍳
            </div>

            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-orange-500 transition-colors duration-300">
              RecipeHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-gray-700 font-medium transition-colors duration-300 hover:text-orange-500 group"
              >
                {link.name}

                {/* underline effect */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex justify-end items-center">

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-lg border border-orange-400 text-orange-500 font-medium hover:bg-orange-50 transition-all duration-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X size={26} />
              ) : (
                <Menu size={26} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-4">

            {/* Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 font-medium hover:text-orange-500 transition"
              >
                {link.name}
              </Link>
            ))}

            {/* Buttons */}
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg border border-orange-400 text-orange-500 font-medium hover:bg-orange-50 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition shadow-md"
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
