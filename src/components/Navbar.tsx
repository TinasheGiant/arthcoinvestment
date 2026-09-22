import React, { useState } from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/timberData';
import { Phone, Menu, X, ArrowRight, TreePine, HardHat } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenQuoteModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#16291E]/95 backdrop-blur-md text-white border-b border-[#2A4837] transition-all duration-200">
      {/* Top emergency and location micro-bar */}
      <div className="hidden sm:block bg-[#0F1E15] text-[#A8C7B4] text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#1D3526]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[#E2C08D]">
              <TreePine className="w-3.5 h-3.5 mr-1.5 text-[#E2C08D]" />
              Nixwood 10314, Nyakamete · Mutare, Zimbabwe
            </span>
            <span className="text-[#5E7A68]">|</span>
            <span className="text-[#D0DFD6]">Direct Mill Dispatch & Wholesale Supply</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#A8C7B4]">Sales Hotlines:</span>
            <a href="tel:0773412197" className="hover:text-white font-medium text-[#E2C08D] transition-colors">
              0773 412 197
            </a>
            <span className="text-[#5E7A68]">/</span>
            <a href="tel:0771744334" className="hover:text-white transition-colors">
              0771 744 334
            </a>
            <span className="text-[#5E7A68]">/</span>
            <a href="tel:0777076797" className="hover:text-white transition-colors">
              0777 076 797
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none"
            aria-label="Arthco Timbers Home"
          >
            <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md mr-3.5 border border-[#3E6C51] group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src="/logo.svg"
                alt="Arthco Timbers Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                }}
              />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none">
                <span>ARTHCO</span>
                <span className="text-[#0F5B9E] bg-white font-bold text-xs px-1.5 py-0.5 rounded tracking-wider uppercase">
                  TIMBERS
                </span>
              </div>
              <p className="text-xs text-[#E2C08D] font-medium tracking-wide mt-1 italic">
                for your quality timber
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-all duration-150 ${
                    isActive
                      ? 'text-white bg-[#254633] shadow-inner font-bold border border-[#3E6C51]'
                      : 'text-[#C5D9CC] hover:text-white hover:bg-[#1D3627]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="tel:0773412197"
              className="inline-flex items-center text-xs font-semibold px-3 py-2 rounded-lg bg-[#203D2B] text-[#D8E8DC] hover:text-white hover:bg-[#2A4F38] border border-[#345D43] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#E2C08D]" />
              0773 412 197
            </a>

            <button
              onClick={() => {
                if (onOpenQuoteModal) {
                  onOpenQuoteModal();
                } else {
                  handleNavClick('contact');
                }
              }}
              className="inline-flex items-center justify-center text-xs uppercase tracking-wider font-bold px-4 py-2.5 rounded-lg bg-[#C28846] text-[#142318] hover:bg-[#D49855] shadow-sm hover:shadow transition-all duration-150 active:scale-95"
            >
              Request Timber Quote
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <a
              href="tel:0773412197"
              className="p-2 rounded-md bg-[#244230] text-[#E2C08D] hover:bg-[#2F573F]"
              aria-label="Call Arthco Sales"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#C5D9CC] hover:text-white hover:bg-[#244230] focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#112017] border-b border-[#294634] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3.5 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#254633] text-white font-bold border border-[#3E6C51]'
                    : 'text-[#C5D9CC] hover:bg-[#1A3123] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1F3728] space-y-2">
            <div className="text-xs text-[#8BAAA4] font-medium px-1">
              Direct Sales Hotlines:
            </div>
            <div className="grid grid-cols-3 gap-1 text-center">
              {COMPANY_INFO.phones.map((p) => (
                <a
                  key={p.number}
                  href={`tel:${p.number.replace(/\s+/g, '')}`}
                  className="bg-[#1A3123] hover:bg-[#254633] text-[#E2C08D] text-xs font-semibold py-2 px-1 rounded border border-[#2B4B36]"
                >
                  {p.number}
                </a>
              ))}
            </div>

            <button
              onClick={() => {
                handleNavClick('contact');
              }}
              className="w-full mt-2 flex items-center justify-center text-xs uppercase tracking-wider font-bold py-3 rounded-lg bg-[#C28846] text-[#142318] hover:bg-[#D49855]"
            >
              Request Timber Quote
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
