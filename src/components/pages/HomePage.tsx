import React from 'react';
import { PageId } from '../../types';
import { COMPANY_INFO, CORE_VALUES, TIMBER_PRODUCTS, TIMBER_SPECS_GUIDE } from '../../data/timberData';
import { TimberCalculator } from '../TimberCalculator';
import { 
  TreePine, 
  Truck, 
  Hammer, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  Users, 
  Leaf, 
  TrendingUp, 
  Phone, 
  CheckCircle2, 
  MapPin, 
  Layers,
  Sparkles,
  Video,
  Play
} from 'lucide-react';
import { useData } from '../../context/DataContext';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { images, videos, services } = useData();

  // Dynamic Spotlight Photos wired from backend
  const spotlightPhotos = React.useMemo(() => {
    const tagged = images.filter(img => img.placement === 'homepage_spotlight' || img.featured);
    const remaining = images.filter(img => !tagged.some(t => t.id === img.id));
    const combined = [...tagged, ...remaining];
    return combined.slice(0, 4);
  }, [images]);

  // Dynamic Featured Video wired from backend
  const featuredVideo = React.useMemo(() => {
    return videos.find(v => v.placement === 'homepage' || v.featured) || videos[0];
  }, [videos]);
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#14261C] text-white pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#254633]">
        {/* Background Overlay */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-luminosity bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('/images/arthco_sawmill_yard.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1B13] via-[#14261C]/90 to-[#1B3526]/80 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-3 px-3.5 py-1.5 rounded-full bg-[#1A3826]/90 border border-[#345F45] text-[#E2C08D] text-xs font-bold shadow-sm">
                <div className="w-6 h-6 rounded bg-white p-0.5 shrink-0 border border-white/40">
                  <img 
                    src="/logo.svg" 
                    alt="Arthco Timbers Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                    }}
                  />
                </div>
                <span>Arthco Timbers · <span className="italic font-normal text-white">"for your quality timber"</span></span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                A Rapidly Growing <span className="text-[#E2C08D]">Timber Producer</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#B9D4C4] leading-relaxed max-w-2xl font-normal">
                {COMPANY_INFO.tagline}
              </p>

              {/* Badges / Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center space-x-2 text-[#D7E8DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#E2C08D] shrink-0" />
                  <span>Wood-Mizer LT15 Sawing</span>
                </div>
                <div className="flex items-center space-x-2 text-[#D7E8DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#E2C08D] shrink-0" />
                  <span>Wholesale & Retail</span>
                </div>
                <div className="flex items-center space-x-2 text-[#D7E8DE]">
                  <CheckCircle2 className="w-4 h-4 text-[#E2C08D] shrink-0" />
                  <span>Prompt Nationwide Delivery</span>
                </div>
              </div>

              {/* Call to actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-all duration-150 shadow-md hover:shadow-lg flex items-center"
                >
                  Request Timber Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 rounded-lg bg-[#1F3D2B] hover:bg-[#2A523A] text-white border border-[#3A6B4C] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Our Services
                </button>

                <a
                  href="tel:0773412197"
                  className="px-5 py-3.5 rounded-lg bg-[#0F1E15] hover:bg-[#162D20] text-[#E2C08D] border border-[#274834] font-semibold text-xs transition-colors flex items-center"
                >
                  <Phone className="w-3.5 h-3.5 mr-2 text-[#E2C08D]" />
                  Call: 0773 412 197
                </a>
              </div>
            </div>

            {/* Right Card / Sawmill Operations Highlight */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-[#1E3829] to-[#122419] p-6 sm:p-7 border border-[#2F573F] shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#2B4E38]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[#C28846] flex items-center justify-center text-[#142318] font-bold">
                      <Layers className="w-5 h-5 text-[#142318]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                        Operational Capacity
                      </h2>
                      <p className="text-xs text-[#8EB29C]">Nixwood 10314, Nyakamete</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#2A4F38] text-[#E2C08D] border border-[#3E7252]">
                    Active Sawmill
                  </span>
                </div>

                {/* Operations Key stats */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="bg-[#172D20] p-3.5 rounded-xl border border-[#294B35]">
                    <span className="text-[11px] text-[#86A893] uppercase font-bold block">
                      Core Operations
                    </span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      Harvesting & Milling
                    </span>
                    <p className="text-[11px] text-[#A6C4B1] mt-0.5">Direct log extraction & processing</p>
                  </div>
                  <div className="bg-[#172D20] p-3.5 rounded-xl border border-[#294B35]">
                    <span className="text-[11px] text-[#86A893] uppercase font-bold block">
                      Sawing Tech
                    </span>
                    <span className="text-sm font-bold text-[#E2C08D] mt-1 block">
                      Wood-Mizer LT15
                    </span>
                    <p className="text-[11px] text-[#A6C4B1] mt-0.5">Thin-kerf, high-yield recovery</p>
                  </div>
                  <div className="bg-[#172D20] p-3.5 rounded-xl border border-[#294B35]">
                    <span className="text-[11px] text-[#86A893] uppercase font-bold block">
                      Primary Products
                    </span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      Sawn Pine & Gum
                    </span>
                    <p className="text-[11px] text-[#A6C4B1] mt-0.5">Structural, roofing, joinery</p>
                  </div>
                  <div className="bg-[#172D20] p-3.5 rounded-xl border border-[#294B35]">
                    <span className="text-[11px] text-[#86A893] uppercase font-bold block">
                      Supply Reach
                    </span>
                    <span className="text-sm font-bold text-white mt-1 block">
                      Nationwide Zimbabwe
                    </span>
                    <p className="text-[11px] text-[#A6C4B1] mt-0.5">Wholesale & retail networks</p>
                  </div>
                </div>

                {/* Quick Phone links */}
                <div className="pt-2 border-t border-[#2B4E38]">
                  <span className="text-[11px] font-bold text-[#A6C5B3] uppercase tracking-wider block mb-2">
                    Direct Sales & Yard Dispatch:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {COMPANY_INFO.phones.map((phone) => (
                      <a
                        key={phone.number}
                        href={`tel:${phone.clean}`}
                        className="px-2.5 py-1.5 rounded bg-[#203D2C] hover:bg-[#2A503A] text-white font-medium border border-[#345F45] transition-colors"
                      >
                        {phone.number}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-[#D8E4DC] shadow-sm relative overflow-hidden group hover:border-[#2C593F] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#EBF3ED] text-[#1E432E] flex items-center justify-center mb-6">
              <TreePine className="w-6 h-6 text-[#1E432E]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
              Guiding Principle
            </span>
            <h2 className="text-2xl font-extrabold text-[#14261C] mt-1 mb-4">
              Our Mission
            </h2>
            <blockquote className="text-base sm:text-lg text-[#2A4032] italic font-medium leading-relaxed border-l-4 border-[#1E432E] pl-4 py-1">
              "{COMPANY_INFO.mission}"
            </blockquote>
            <p className="text-xs text-[#5C7566] mt-4">
              Tailored for builders, carpenters, furniture makers, and retailers across Zimbabwe.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#162D20] text-white rounded-2xl p-8 sm:p-10 border border-[#274834] shadow-sm relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-[#254834] text-[#E2C08D] flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#E2C08D]" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              Long-Term Outlook
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1 mb-4">
              Our Vision
            </h2>
            <blockquote className="text-base sm:text-lg text-[#D0E2D7] italic font-medium leading-relaxed border-l-4 border-[#C28846] pl-4 py-1">
              "{COMPANY_INFO.vision}"
            </blockquote>
            <p className="text-xs text-[#8EB29D] mt-4">
              Supporting infrastructural development, job creation, and sustainable resource management.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUES: WHAT DRIVES US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C28846] font-extrabold">
            What Drives Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14261C] mt-2">
            Our Core Values
          </h2>
          <p className="text-base text-[#4E6657] mt-3">
            At Arthco Investments, our daily sawmilling, log harvesting, and customer engagements are guided by five fundamental pillars.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_VALUES.map((val) => {
            const getIcon = (iconName: string) => {
              switch (iconName) {
                case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#1E432E]" />;
                case 'Scale': return <Scale className="w-6 h-6 text-[#1E432E]" />;
                case 'Users': return <Users className="w-6 h-6 text-[#1E432E]" />;
                case 'Leaf': return <Leaf className="w-6 h-6 text-[#1E432E]" />;
                case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#1E432E]" />;
                default: return <TreePine className="w-6 h-6 text-[#1E432E]" />;
              }
            };

            return (
              <div
                key={val.title}
                className="bg-white rounded-xl p-7 border border-[#D9E4DD] shadow-sm hover:shadow-md hover:border-[#2C593F] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#EBF3ED] flex items-center justify-center mb-4">
                    {getIcon(val.iconName)}
                  </div>
                  <h3 className="text-xl font-bold text-[#14261C]">
                    {val.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider font-bold text-[#C28846] mt-0.5 mb-3">
                    {val.subtitle}
                  </p>
                  <p className="text-sm text-[#4E6657] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Call to action block matching the grid */}
          <div className="bg-gradient-to-br from-[#1A3324] to-[#102117] text-white rounded-xl p-7 border border-[#2B4B36] flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#C28846] flex items-center justify-center text-[#142318] mb-4">
                <Sparkles className="w-6 h-6 text-[#142318]" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Partner With Arthco
              </h3>
              <p className="text-xs uppercase tracking-wider font-bold text-[#E2C08D] mt-0.5 mb-3">
                Wholesale & Retail Contracts
              </p>
              <p className="text-sm text-[#B4CCC0] leading-relaxed">
                Whether you run a commercial hardware chain or are building a residential project, our Mutare team is ready with competitive volume pricing.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="mt-6 w-full py-2.5 px-4 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
            >
              Get In Touch
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>
      </section>

      {/* END-TO-END PROCESS */}
      <section className="bg-[#F0F5F2] py-16 border-y border-[#D6E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
              Our Complete Value Chain
            </span>
            <h2 className="text-3xl font-extrabold text-[#14261C] mt-2">
              From Forest Log to Finished Timber
            </h2>
            <p className="text-sm text-[#4E6657] mt-2">
              How Arthco Investments integrates harvesting, transport, and precision milling.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-[#D5E2D9] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3324] text-[#E2C08D] font-bold text-xs flex items-center justify-center mb-4">
                01
              </span>
              <h3 className="text-base font-bold text-[#14261C]">Log Sourcing</h3>
              <p className="text-xs text-[#567061] mt-2 leading-relaxed">
                Selective harvesting of mature, high-grade pine and gum sawlogs from sustainable Eastern Highlands plantations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#D5E2D9] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3324] text-[#E2C08D] font-bold text-xs flex items-center justify-center mb-4">
                02
              </span>
              <h3 className="text-base font-bold text-[#14261C]">Heavy Transport</h3>
              <p className="text-xs text-[#567061] mt-2 leading-relaxed">
                Specialized log transport hauling raw timber safely from mountain compartments to our Nyakamete sawmill yard.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#D5E2D9] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3324] text-[#E2C08D] font-bold text-xs flex items-center justify-center mb-4">
                03
              </span>
              <h3 className="text-base font-bold text-[#14261C]">Wood-Mizer Milling</h3>
              <p className="text-xs text-[#567061] mt-2 leading-relaxed">
                Thin-kerf band sawing on our Wood-Mizer LT15, producing smooth, dimensionally accurate sawn timber with high recovery.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#D5E2D9] shadow-sm">
              <span className="w-8 h-8 rounded-full bg-[#1A3324] text-[#E2C08D] font-bold text-xs flex items-center justify-center mb-4">
                04
              </span>
              <h3 className="text-base font-bold text-[#14261C]">Wholesale & Retail</h3>
              <p className="text-xs text-[#567061] mt-2 leading-relaxed">
                Strap-banded bundles dispatched for wholesale supply or walk-in retail purchases at our Mutare timber yard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHENTIC ON-SITE PHOTOS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#152B1E] rounded-2xl p-8 sm:p-10 border border-[#274B35] text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
                Direct From Mutare
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Inside Our Nyakamete Milling Operations
              </h2>
              <p className="text-xs sm:text-sm text-[#A7C8B4] mt-1">
                Authentic on-site photography of our Wood-Mizer LT15 sawmill track, cut timber planks, and seasoning stacks.
              </p>
            </div>
            <button
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#E2C08D] hover:text-white transition-colors"
            >
              Open Full Photo Gallery
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {spotlightPhotos.map((photo) => (
              <div 
                key={photo.id}
                onClick={() => onNavigate('gallery')}
                className="group cursor-pointer rounded-xl overflow-hidden bg-[#0F2016] border border-[#2A4D37] hover:border-[#E2C08D] transition-all flex flex-col justify-between"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                    }}
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[#E2C08D] text-[10px] uppercase font-bold backdrop-blur-xs">
                    {photo.highlight || photo.categoryLabel || 'Sawmill'}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-white group-hover:text-[#E2C08D] transition-colors truncate">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-[#8CB49C] mt-0.5 line-clamp-1">
                    {photo.description || 'Authentic on-site milling photography'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Sawmill Video Showcase if available */}
          {featuredVideo && (
            <div className="mt-8 pt-8 border-t border-[#274B35]">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#0E1B13] p-5 sm:p-6 rounded-xl border border-[#23422F]">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C28846] bg-[#243528] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <Video className="w-3 h-3" />
                      Featured Sawmill Footage
                    </span>
                    {featuredVideo.duration && (
                      <span className="text-[11px] text-[#8CB49C]">
                        {featuredVideo.duration}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-xs text-[#A7C8B4] leading-relaxed">
                    {featuredVideo.description || 'Watch our Wood-Mizer thin-kerf band saw slicing quality pine and gum logs in Mutare, Zimbabwe.'}
                  </p>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="inline-flex items-center text-xs font-bold text-[#E2C08D] hover:underline pt-1"
                  >
                    View more videos in Gallery archive
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>

                <div className="w-full lg:w-80 shrink-0 aspect-video rounded-lg overflow-hidden bg-black border border-[#2E543D] shadow-md">
                  {featuredVideo.embedUrl ? (
                    <iframe
                      src={featuredVideo.embedUrl}
                      title={featuredVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div 
                      onClick={() => onNavigate('gallery')}
                      className="w-full h-full relative cursor-pointer group flex items-center justify-center"
                    >
                      <img
                        src={featuredVideo.thumbnailUrl || '/images/arthco_woodmizer_lt15.jpg'}
                        alt={featuredVideo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="w-10 h-10 rounded-full bg-white/90 text-[#14261C] flex items-center justify-center shadow">
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED TIMBER PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
              Standard & Custom Profiles
            </span>
            <h2 className="text-3xl font-extrabold text-[#14261C] mt-1">
              Premium Sawn Timber Catalog
            </h2>
            <p className="text-sm text-[#4E6657] mt-1">
              Precision-cut from Eastern Highlands pine for structural, roofing, and joinery applications.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#1E432E] hover:text-[#C28846] transition-colors"
          >
            View all services & specs
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIMBER_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl border border-[#D9E4DD] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-[#13251B]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded backdrop-blur-sm">
                    {prod.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[#14261C] leading-snug">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-[#526B5C] mt-2 line-clamp-2">
                    {prod.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-[11px] font-bold text-[#2A4836] uppercase tracking-wide block mb-1">
                      Common Sizes:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {prod.standardSizes.slice(0, 3).map((sz) => (
                        <span
                          key={sz}
                          className="text-[11px] px-2 py-0.5 rounded bg-[#F1F6F3] text-[#244732] border border-[#DEE7E2]"
                        >
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2 rounded-lg bg-[#EBF3ED] hover:bg-[#1E432E] hover:text-white text-[#1E432E] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Inquire This Timber
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TIMBER CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TimberCalculator />
      </section>

      {/* QUICK LOCATION / DISPATCH CTA STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="rounded-2xl bg-[#172E21] text-white p-8 sm:p-10 border border-[#2B523B] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-[#E2C08D] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Nixwood 10314, Nyakamete · Mutare, Zimbabwe</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Visit our Timber Yard or Order for Site Delivery
            </h3>
            <p className="text-sm text-[#A5C2B1] max-w-2xl">
              Inspect our sawn timber stacks firsthand in Nyakamete, or contact our sales dispatch to arrange prompt truckloads to Harare, Bulawayo, and regional destinations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors text-center"
            >
              Contact Yard Office
            </button>
            <a
              href="https://wa.me/263773412197"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20BA5A] text-[#0A2612] font-bold text-xs uppercase tracking-wider transition-colors text-center"
            >
              WhatsApp 0773 412 197
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
