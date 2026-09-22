import React from 'react';
import { PageId } from '../../types';
import { SERVICES_LIST, TIMBER_SPECS_GUIDE, COMPANY_INFO } from '../../data/timberData';
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
  ShieldCheck
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
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

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((srv) => (
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
                    referrerPolicy="no-referrer"
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
                  <span className="text-[#A2C4AF]">Able to break down large log diameters into custom length timbers.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl overflow-hidden border border-[#2D583F] shadow-lg relative h-48 sm:h-56">
                <img
                  src="/images/arthco_woodmizer_lt15.jpg"
                  alt="Wood-Mizer LT15 Sawmill at Nyakamete Mutare"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-[#E2C08D] font-bold uppercase tracking-wider block">
                    Sawmill Equipment
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    Wood-Mizer LT15 at Nyakamete Yard
                  </h4>
                </div>
              </div>

              <div className="bg-[#122419] p-5 rounded-xl border border-[#2A4B36] space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Timber Grading Standards
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-[#1A3324]">
                    <span className="font-medium text-white">Wet-Off-Saw (WOS)</span>
                    <span className="text-[#E2C08D]">Available immediately</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#1A3324]">
                    <span className="font-medium text-white">Air-Seasoned Pine</span>
                    <span className="text-[#E2C08D]">Even moisture loss</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#1A3324]">
                    <span className="font-medium text-white">Structural Grade S5/S7</span>
                    <span className="text-[#E2C08D]">Load-bearing certified</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full py-2.5 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Inquire About Custom Sawing
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARD TIMBER SPECIFICATIONS TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
            Standard Sizing Reference
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261C] mt-1">
            Common Dimensions Produced at Arthco
          </h2>
          <p className="text-sm text-[#4E6657] mt-1">
            We manufacture both standard industry cross-sections and bespoke sizes upon request.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-[#D8E3DC] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#F2F6F3] text-[#1B3626] uppercase text-[11px] font-bold tracking-wider border-b border-[#DEE7E2]">
                <tr>
                  <th className="px-6 py-4">Timber Product Category</th>
                  <th className="px-6 py-4">Standard Dimensions (mm)</th>
                  <th className="px-6 py-4">Standard Lengths</th>
                  <th className="px-6 py-4">Primary Application</th>
                  <th className="px-6 py-4 text-right">Order Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBF1ED] text-[#3A5043]">
                {TIMBER_SPECS_GUIDE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#F9FAF9] transition-colors">
                    <td className="px-6 py-4 font-bold text-[#14261C]">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-[#1E432E]">
                      {item.dimension}
                    </td>
                    <td className="px-6 py-4">
                      {item.commonLengths}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {item.idealFor}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onNavigate('contact')}
                        className="text-xs font-bold text-[#C28846] hover:text-[#9A6224] transition-colors"
                      >
                        Inquire →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* INTERACTIVE TIMBER CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TimberCalculator />
      </section>

      {/* CONTACT STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-[#152B1E] text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#274B35]">
          <div>
            <h3 className="text-xl font-bold">Need a specific timber cut or large volume order?</h3>
            <p className="text-xs text-[#A8C6B4] mt-1">
              Contact our sales hotline directly: 0773 412 197 / 0771 744 334 / 0777 076 797
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Contact Sales Team
          </button>
        </div>
      </section>
    </div>
  );
};
