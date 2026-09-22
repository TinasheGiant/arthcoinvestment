import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO, CORE_VALUES } from '../data/timberData';
import { MapPin, Phone, Mail, Clock, TreePine, ArrowUpRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#122118] text-[#D8E6DE] border-t border-[#233F2E]">
      {/* Top Banner / Call to Action Strip */}
      <div className="bg-[#192E22] border-b border-[#2A4B37] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              Direct Mill Sourcing in Mutare
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Ready to supply your construction, roofing, or retail timber needs?
            </h3>
            <p className="text-sm text-[#A5C2B1] mt-1 max-w-2xl">
              Harvested in the Eastern Highlands, precision-sawn on our Wood-Mizer LT15, and delivered reliably across Zimbabwe.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/263773412197?text=Hello%20Arthco%20Investments%2C%20I%20would%20like%20to%20inquire%20about%20timber%20supply."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              WhatsApp Us (0773 412 197)
            </a>
            <button
              onClick={() => handleNav('contact')}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Get Custom Quote
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-xl bg-white p-1 flex items-center justify-center shadow-md border border-[#3E6C51] shrink-0">
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
                <div className="flex items-center space-x-1.5 leading-none">
                  <h4 className="text-xl font-extrabold text-white tracking-tight">ARTHCO</h4>
                  <span className="text-[#0F5B9E] bg-white font-bold text-xs px-1.5 py-0.5 rounded uppercase">TIMBERS</span>
                </div>
                <p className="text-xs text-[#E2C08D] font-medium italic mt-1">for your quality timber</p>
                <p className="text-[11px] text-[#8BAAA4]">Mutare, Zimbabwe</p>
              </div>
            </div>

            <p className="text-sm text-[#B4CCC0] leading-relaxed">
              {COMPANY_INFO.tagline}
            </p>

            {/* Quick Values Badges */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-[#E2C08D] font-bold block mb-2">
                Our Core Values:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CORE_VALUES.map((val) => (
                  <span
                    key={val.title}
                    className="inline-block text-xs bg-[#1C3325] text-[#D3E7DC] px-2.5 py-1 rounded border border-[#2B4B36]"
                  >
                    {val.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  Services & Supply
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  About Arthco
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sustainability')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  Sawmill Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors flex items-center"
                >
                  Contact & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Mill Location */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              Sawmill & Yard Location
            </h4>
            <div className="space-y-3 text-sm text-[#B4CCC0]">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#E2C08D] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Nixwood 10314, Nyakamete</p>
                  <p>Mutare, Zimbabwe</p>
                  <span className="text-xs text-[#87A895]">Industrial Sawmilling Zone</span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-[#E2C08D] shrink-0 mt-1" />
                <div className="space-y-1">
                  {COMPANY_INFO.phones.map((p) => (
                    <div key={p.number}>
                      <a
                        href={`tel:${p.number.replace(/\s+/g, '')}`}
                        className="hover:text-white text-white font-medium block"
                      >
                        {p.number}
                      </a>
                      <span className="text-xs text-[#87A895] block -mt-0.5">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#E2C08D] shrink-0" />
                <span className="text-xs">Mon – Fri: 7:30AM – 5:00PM | Sat: 8AM – 1PM</span>
              </div>
            </div>
          </div>

          {/* Column 4: Mission & Vision Snapshot */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              Our Vision
            </h4>
            <p className="text-xs text-[#B4CCC0] italic border-l-2 border-[#C28846] pl-3 py-1">
              "{COMPANY_INFO.vision}"
            </p>

            <h4 className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold pt-2">
              Our Mission
            </h4>
            <p className="text-xs text-[#B4CCC0] italic border-l-2 border-[#3C6E52] pl-3 py-1">
              "{COMPANY_INFO.mission}"
            </p>
          </div>
        </div>

        {/* Bottom Bar with exact required copyright & subtitle */}
        <div className="mt-12 pt-8 border-t border-[#1F3829] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BAAA4] gap-4">
          <p className="font-medium text-[#B4CCC0]">
            {COMPANY_INFO.copyright}
          </p>
          <div className="flex items-center space-x-2 text-[#E2C08D] font-semibold">
            <span>{COMPANY_INFO.footerTagline}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
              About
            </button>
            <span>•</span>
            <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
              Services
            </button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
              Direct Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
