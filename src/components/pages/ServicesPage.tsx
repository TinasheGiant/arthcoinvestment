import React from 'react';
import { PageId } from '../../types';
import { COMPANY_INFO } from '../../data/timberData';
import { useData } from '../../context/DataContext';
import { TimberCalculator } from '../TimberCalculator';
import { 
  TreePine, 
  Truck, 
  Hammer, 
  Building2, 
  Store, 
  Recycle, 
  CheckCircle, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Ruler
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { services, dimensions } = useData();
  const activeServices = services.filter((s) => s.active !== false);

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'Trees': return <TreePine className="w-6 h-6 text-[#1E432E]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#1E432E]" />;
      case 'Hammer': return <Hammer className="w-6 h-6 text-[#1E432E]" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-[#1E432E]" />;
      case 'Store': return <Store className="w-6 h-6 text-[#1E432E]" />;
      case 'Recycle': return <Recycle className="w-6 h-6 text-[#1E432E]" />;
      default: return <Hammer className="w-6 h-6 text-[#1E432E]" />;
    }
  };

  return (
    <div className="space-y-16 py-10">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#152B1E] rounded-2xl text-white p-8 sm:p-12 relative overflow-hidden border border-[#274B35]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
              End-to-End Timber Operations
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Sawmill & Supply Services
            </h1>
            <p className="text-base text-[#BBD6C6] leading-relaxed">
              Harvesting, transporting, and processing logs into premium sawn timber for wholesale and retail supply across Zimbabwe. We combine precision Wood-Mizer sawmilling with dedicated transport and ethical sourcing.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
            <TreePine className="w-96 h-96 text-white" />
          </div>
        </div>
      </section>

      {/* Services Grid (Dynamic from DataContext) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-[#D8E3DC] overflow-hidden shadow-sm hover:shadow-md hover:border-[#2C593F] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/arthco_sawmill_yard.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-white/95 flex items-center justify-center shadow">
                      {getServiceIcon(srv.icon)}
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide drop-shadow">
                      {srv.title}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold text-[#C28846] uppercase tracking-wider block mb-1">
                    {srv.tagline}
                  </span>
                  <p className="text-sm text-[#4E6657] leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  {srv.bulletPoints && srv.bulletPoints.length > 0 && (
                    <div className="border-t border-[#E8EFEA] pt-4">
                      <span className="text-xs font-bold text-[#1E3B2A] uppercase tracking-wide block mb-2">
                        Key Highlights:
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#4F6859]">
                        {srv.bulletPoints.map((bp, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 rounded-lg bg-[#EBF3ED] hover:bg-[#1E432E] hover:text-white text-[#1E432E] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center"
                >
                  Request Timber Quote
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WOOD-MIZER LT15 SPECIAL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#183123] rounded-2xl p-8 sm:p-12 text-white border border-[#2B523B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#E2C08D] font-bold">
                Sawmill Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Wood-Mizer LT15 Precision Thin-Kerf Band Sawmilling
              </h2>
              <p className="text-sm text-[#BCD4C5] leading-relaxed">
                At our Nyakamete facility in Mutare, Zimbabwe, we rely on the Wood-Mizer LT15 band sawmill system. Unlike heavy circular saws that produce wide kerf cuts and wasteful sawdust mounds, the thin-kerf band blade produces maximum yield per log:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-[#1F3D2C] p-3 rounded-lg border border-[#2D583F]">
                  <span className="font-bold text-white block mb-0.5">True-To-Dimension Accuracy</span>
                  <span className="text-[#A2C4AF]">Prevents uneven thicknesses and reduces planning waste for carpenters.</span>
                </div>
                <div className="bg-[#1F3D2C] p-3 rounded-lg border border-[#2D583F]">
                  <span className="font-bold text-white block mb-0.5">Higher Log Recovery</span>
                  <span className="text-[#A2C4AF]">Up to 30% more usable timber extracted from every single sawlog.</span>
                </div>
                <div className="bg-[#1F3D2C] p-3 rounded-lg border border-[#2D583F]">
                  <span className="font-bold text-white block mb-0.5">Smooth Saw Cut Finish</span>
                  <span className="text-[#A2C4AF]">Ideal for exposed trusses, roofing rafters, and joinery boards.</span>
                </div>
                <div className="bg-[#1F3D2C] p-3 rounded-lg border border-[#2D583F]">
                  <span className="font-bold text-white block mb-0.5">Custom Beam Capabilities</span>
                  <span className="text-[#A2C4AF]">Ability to saw specialized architectural balks up to 6.5m lengths.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#112419] p-6 rounded-xl border border-[#294B37] space-y-4">
                <div className="flex items-center space-x-2 text-[#E2C08D]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-wide">Sawmill Machine Specs</span>
                </div>
                <div className="space-y-2 text-xs text-[#B9D2C3]">
                  <div className="flex justify-between py-1.5 border-b border-[#1E3B2A]">
                    <span className="text-[#7A9C86]">Equipment:</span>
                    <span className="font-semibold text-white">Wood-Mizer LT15 Band Saw</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#1E3B2A]">
                    <span className="text-[#7A9C86]">Max Log Diameter:</span>
                    <span className="font-semibold text-white">71 cm (28 inches)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#1E3B2A]">
                    <span className="text-[#7A9C86]">Cutting Length:</span>
                    <span className="font-semibold text-white">5.4m standard (extendable to 7.2m)</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#1E3B2A]">
                    <span className="text-[#7A9C86]">Blade Kerf:</span>
                    <span className="font-semibold text-white">1.5mm - 2.0mm ultra-thin kerf</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#7A9C86]">Operator Certification:</span>
                    <span className="font-semibold text-white">Certified Saw Technicians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timber Volume & Dimension Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TimberCalculator />
      </section>

      {/* Common Dimensions Guide (Dynamic from Backend) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#D8E3DC] p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5" />
                Live Milling Specifications
              </span>
              <h2 className="text-2xl font-bold text-[#14261C] mt-1">
                Common Zimbabwe Structural Timber Dimensions
              </h2>
              <p className="text-xs text-[#526B5C] mt-1">
                Standard nominal sizes milled wet-off-saw and seasoned at Arthco Timbers. Managed in real time via backend control.
              </p>
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className="text-xs font-bold text-[#2C593F] hover:underline"
            >
              Order Custom Cut Dimension →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dimensions.map((dim) => (
              <div key={dim.id} className="p-4 rounded-xl border border-[#E3ECE6] bg-[#FAFCFA] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-bold text-[#14261C] font-mono">{dim.dimension}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF3ED] text-[#2C593F]">
                      {dim.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#526B5C] mb-2">{dim.idealFor}</p>
                </div>
                <div className="text-[11px] text-[#7A9986] flex items-center justify-between border-t border-[#E8EFEA] pt-1.5">
                  <span>Stock Lengths:</span>
                  <span className="font-semibold text-[#20402E]">{dim.standardLengths}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
