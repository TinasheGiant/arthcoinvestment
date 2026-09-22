import React, { useState } from 'react';
import { MessageSquare, X, Phone, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/timberData';

export const WhatsAppFloatingButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Expanded quick contact menu */}
      {open && (
        <div className="mb-3 w-72 bg-[#122319] text-white rounded-xl shadow-2xl border border-[#2D5039] p-4 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[#254230]">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-[#E2C08D]">
                Arthco Timber Hotlines
              </h4>
              <p className="text-[11px] text-[#A6C4B2]">Chat or call directly on WhatsApp</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded text-[#8FAFA0] hover:text-white hover:bg-[#203D2B]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {COMPANY_INFO.phones.map((phone) => (
              <a
                key={phone.number}
                href={`https://wa.me/${phone.clean}?text=Hello%20Arthco%20Investments%2C%20I%20would%20like%20to%20inquire%20about%20timber%20supply.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[#1B3324] hover:bg-[#264733] border border-[#2A4C36] transition-colors group"
              >
                <div>
                  <span className="text-xs font-bold text-white block">{phone.number}</span>
                  <span className="text-[10px] text-[#A7C8B5]">{phone.label}</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center text-[#0E2C17] group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t border-[#254230] text-[10px] text-[#86A694] text-center">
            Mutare Sawmill & Nyakamete Yard Dispatch
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-extrabold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Contact Arthco Investments on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs tracking-wider uppercase hidden sm:inline">WhatsApp Arthco</span>
      </button>
    </div>
  );
};
