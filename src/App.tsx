/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { PageId } from './types';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { SustainabilityPage } from './components/pages/SustainabilityPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { ContactPage } from './components/pages/ContactPage';
import { AdminPortal } from './components/admin/AdminPortal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { QuoteModal } from './components/QuoteModal';

const VALID_PAGES: PageId[] = [
  'home',
  'services',
  'about',
  'sustainability',
  'gallery',
  'contact',
  'admin'
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home';

  const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  const searchParam = new URLSearchParams(window.location.search).get('page')?.toLowerCase();

  const candidate = (pathname || hash || searchParam || '') as PageId;
  if (VALID_PAGES.includes(candidate)) {
    return candidate;
  }

  // Check if pathname starts with admin (e.g. /admin)
  if (pathname.startsWith('admin')) {
    return 'admin';
  }

  return 'home';
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const navigateTo = useCallback((page: PageId) => {
    setCurrentPage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
  }, []);

  // Listen to browser navigation (back/forward & hash changes)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Sync scroll on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (currentPage === 'admin') {
    return <AdminPortal onNavigate={navigateTo} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'services':
        return <ServicesPage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'sustainability':
        return <SustainabilityPage onNavigate={navigateTo} />;
      case 'gallery':
        return <GalleryPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E2922] font-sans">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Persistent WhatsApp Fast Action */}
      <WhatsAppFloatingButton />

      {/* Quick Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
