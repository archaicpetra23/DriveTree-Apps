/**
 * Navbar — Navigation bar dengan glassmorphism effect.
 */

"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-blue-500/5 border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 3C8 3 5 6 5 9c0 2.5 1.5 4.5 3.5 5.5L8 18h8l-.5-3.5C17.5 13.5 19 11.5 19 9c0-3-3-6-7-6z M9 18h6M10 21h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                DriveTree
              </h1>
              <p className="text-[10px] text-slate-400 -mt-1 font-medium tracking-wider uppercase">
                BST File Manager
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#dashboard" className="nav-link">Dashboard</a>
            <a href="#manage" className="nav-link">Kelola File</a>
            <a href="#visualizer" className="nav-link">Visualisasi</a>
            <a href="#traversal" className="nav-link">Traversal</a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <span
                className={`block h-0.5 bg-slate-600 rounded transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[3px]" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-slate-600 rounded transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 bg-slate-600 rounded transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-60 border-t border-slate-200/50" : "max-h-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl px-4 py-3 space-y-1">
          <a href="#dashboard" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Dashboard</a>
          <a href="#manage" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Kelola File</a>
          <a href="#visualizer" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Visualisasi</a>
          <a href="#traversal" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Traversal</a>
        </div>
      </div>
    </nav>
  );
}
