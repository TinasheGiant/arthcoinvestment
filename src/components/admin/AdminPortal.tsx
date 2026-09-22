import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PageId } from '../../types';
import { ImagesTab } from './ImagesTab';
import { VideosTab } from './VideosTab';
import { DimensionsTab } from './DimensionsTab';
import { CalculatorTab } from './CalculatorTab';
import { ServicesTab } from './ServicesTab';
import { ProfileTab } from './ProfileTab';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Ruler,
  Calculator,
  Trees,
  UserCheck,
  LogOut,
  Globe,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Server,
  Layers,
  Database
} from 'lucide-react';

interface AdminPortalProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onNavigate }) => {
  const {
    currentUser,
    isAuthenticated,
    login,
    logout,
    images,
    videos,
    dimensions,
    services,
    calculatorSettings
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'images' | 'videos' | 'dimensions' | 'calculator' | 'services' | 'profile'>('overview');

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both username and password.');
      return;
    }

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      await login(loginUsername.trim(), loginPassword.trim());
      setLoginUsername('');
      setLoginPassword('');
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // -------------------------------------------------------------
  // NOT AUTHENTICATED: LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen bg-[#0E1A14] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background atmospheric accent */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2C593F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C28846]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#14261C] border border-[#2C593F]/50 shadow-xl mb-4">
            <img
              src="/images/arthco_logo.png"
              alt="Arthco Timbers"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#F4F8F5] tracking-tight">
            Arthco Control Portal
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#C28846] font-bold mt-1">
            "for your quality timber"
          </p>
          <p className="text-xs text-[#9BBBA6] mt-2">
            Secure backend administrative access for managing website content, dimensions, services & media.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          <div className="bg-[#14261C] py-8 px-6 sm:px-10 rounded-2xl border border-[#2C593F]/40 shadow-2xl space-y-6">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-200 font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A8C7B2] mb-1.5">
                  Backend Username
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. director1, director2, it"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1912] border border-[#2A4836] text-[#F4F8F5] placeholder-[#537361] focus:ring-2 focus:ring-[#C28846] focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A8C7B2] mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0D1912] border border-[#2A4836] text-[#F4F8F5] placeholder-[#537361] focus:ring-2 focus:ring-[#C28846] focus:outline-none text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-xl bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                {isLoggingIn ? 'Authenticating...' : 'Sign In to Control Panel'}
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                onClick={() => onNavigate('home')}
                className="text-xs text-[#9BBBA6] hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5" />
                Return to Public Website
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED: CONTROL DASHBOARD
  // -------------------------------------------------------------
  const navTabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'images', label: 'Images & Photos', icon: ImageIcon, badge: images.length },
    { id: 'videos', label: 'Videos', icon: Video, badge: videos.length },
    { id: 'dimensions', label: 'Sizes & Dimensions', icon: Ruler, badge: dimensions.length },
    { id: 'calculator', label: 'Timber Calculator', icon: Calculator },
    { id: 'services', label: 'Services', icon: Trees, badge: services.length },
    { id: 'profile', label: 'User Credentials', icon: UserCheck },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-[#14261C] text-white border-b border-[#233C2D] sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/images/arthco_logo.png"
              alt="Arthco"
              className="w-9 h-9 object-contain bg-[#1F3628] p-1 rounded-lg border border-[#2E503B]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base tracking-tight text-white">
                  Arthco Backend Control
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#C28846] text-[#142318]">
                  v2.0 REST CRUD
                </span>
              </div>
              <p className="text-[10px] text-[#9BBBA6] hidden sm:block">
                Nyakamete Industrial, Mutare • for your quality timber
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* User Badge */}
            <div className="hidden md:flex items-center gap-2.5 bg-[#1C3325] py-1.5 px-3 rounded-xl border border-[#2A4836]">
              <img
                src={currentUser.avatar || '/images/arthco_logo.png'}
                alt={currentUser.fullName}
                className="w-7 h-7 rounded-full object-cover bg-white"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                }}
              />
              <div className="text-left leading-none">
                <div className="text-xs font-bold text-[#F4F8F5]">{currentUser.fullName}</div>
                <div className="text-[10px] text-[#9BBBA6]">{currentUser.role}</div>
              </div>
            </div>

            {/* Public Site Link */}
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#254231] hover:bg-[#2C4F3B] text-[#DCEAE0] hover:text-white text-xs font-bold transition-colors"
              title="Preview Website with live updates"
            >
              <Globe className="w-3.5 h-3.5 mr-1.5 text-[#C28846]" />
              <span className="hidden sm:inline">Preview</span> Website
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/60 text-red-200 text-xs font-bold transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="bg-[#0F1E16] border-t border-[#1C3325] overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1.5">
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#2C593F] text-white shadow-sm'
                      : 'text-[#8EA897] hover:text-white hover:bg-[#182C21]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>{tab.label}</span>
                  {'badge' in tab && tab.badge !== undefined && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#1C3325] text-[#8EA897]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Tab View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome banner */}
            <div className="bg-linear-to-r from-[#14261C] to-[#203E2D] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_center,#C28846_0%,transparent_70%)] opacity-10 pointer-events-none" />
              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#A9CBB3] mb-3 backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C28846]" />
                  Logged in as {currentUser.fullName} ({currentUser.role})
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Website Control & Data Center
                </h2>
                <p className="text-sm text-[#C4D9CC] mt-2 leading-relaxed">
                  Real-time CRUD management for Arthco Investments. All changes made in this portal
                  synchronize immediately to the public site, timber volume calculator, and media gallery.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="px-4 py-2 rounded-lg bg-[#C28846] hover:bg-[#A9753B] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm inline-flex items-center gap-1.5"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    Configure Calculator Rates
                  </button>
                  <button
                    onClick={() => setActiveTab('images')}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Upload Sawmill Photos
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div
                onClick={() => setActiveTab('images')}
                className="bg-white p-5 rounded-xl border border-[#D5E2D9] shadow-xs hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[#2C593F] mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526B5C]">Images</span>
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center group-hover:bg-[#2C593F] group-hover:text-white transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#14261C]">{images.length}</div>
                <p className="text-[11px] text-[#8BAAA4] mt-1">Photos in gallery</p>
              </div>

              <div
                onClick={() => setActiveTab('videos')}
                className="bg-white p-5 rounded-xl border border-[#D5E2D9] shadow-xs hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[#2C593F] mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526B5C]">Videos</span>
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center group-hover:bg-[#2C593F] group-hover:text-white transition-colors">
                    <Video className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#14261C]">{videos.length}</div>
                <p className="text-[11px] text-[#8BAAA4] mt-1">Production videos</p>
              </div>

              <div
                onClick={() => setActiveTab('dimensions')}
                className="bg-white p-5 rounded-xl border border-[#D5E2D9] shadow-xs hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[#2C593F] mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526B5C]">Dimensions</span>
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center group-hover:bg-[#2C593F] group-hover:text-white transition-colors">
                    <Ruler className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#14261C]">{dimensions.length}</div>
                <p className="text-[11px] text-[#8BAAA4] mt-1">Common sizes specs</p>
              </div>

              <div
                onClick={() => setActiveTab('calculator')}
                className="bg-white p-5 rounded-xl border border-[#D5E2D9] shadow-xs hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-[#2C593F] mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526B5C]">Base Rate</span>
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center group-hover:bg-[#2C593F] group-hover:text-white transition-colors">
                    <Calculator className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#14261C]">
                  ${calculatorSettings.defaultRatePerM3}
                </div>
                <p className="text-[11px] text-[#8BAAA4] mt-1">Per cubic meter ($/m³)</p>
              </div>

              <div
                onClick={() => setActiveTab('services')}
                className="bg-white p-5 rounded-xl border border-[#D5E2D9] shadow-xs hover:shadow-md cursor-pointer transition-all group col-span-2 lg:col-span-1"
              >
                <div className="flex items-center justify-between text-[#2C593F] mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526B5C]">Services</span>
                  <div className="w-8 h-8 rounded-lg bg-[#E8F3EC] flex items-center justify-center group-hover:bg-[#2C593F] group-hover:text-white transition-colors">
                    <Trees className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-black text-[#14261C]">{services.length}</div>
                <p className="text-[11px] text-[#8BAAA4] mt-1">Solutions offered</p>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#2C593F] flex items-center justify-center mb-3">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#14261C]">Timber Calculator & Presets</h3>
                  <p className="text-xs text-[#526B5C] mt-1.5 leading-relaxed">
                    Update current ex-mill cubic meter ($/m³) prices in USD, VAT percentages, waste factor, and quick selection buttons.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="text-xs font-bold text-[#2C593F] hover:text-[#14261C] inline-flex items-center gap-1 group"
                >
                  Manage calculator settings <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#2C593F] flex items-center justify-center mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#14261C]">Common Sizes & Dimensions</h3>
                  <p className="text-xs text-[#526B5C] mt-1.5 leading-relaxed">
                    Modify structural rafters (38x114), battens (38x38), purlins (38x76), joists (38x152), and joinery boards with standard lengths.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('dimensions')}
                  className="text-xs font-bold text-[#2C593F] hover:text-[#14261C] inline-flex items-center gap-1 group"
                >
                  Edit common dimensions <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3EE] text-[#2C593F] flex items-center justify-center mb-3">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#14261C]">Credentials & Profiling</h3>
                  <p className="text-xs text-[#526B5C] mt-1.5 leading-relaxed">
                    Edit personal profile info, change account password, and manage director accounts (director1, director2, it).
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="text-xs font-bold text-[#2C593F] hover:text-[#14261C] inline-flex items-center gap-1 group"
                >
                  Manage executive profiles <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* IMAGES TAB */}
        {activeTab === 'images' && <ImagesTab />}

        {/* VIDEOS TAB */}
        {activeTab === 'videos' && <VideosTab />}

        {/* DIMENSIONS TAB */}
        {activeTab === 'dimensions' && <DimensionsTab />}

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && <CalculatorTab />}

        {/* SERVICES TAB */}
        {activeTab === 'services' && <ServicesTab />}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && <ProfileTab />}
      </main>
    </div>
  );
};
