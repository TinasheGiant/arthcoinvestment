import React from 'react';
import { PageId } from '../../types';
import { COMPANY_INFO } from '../../data/timberData';
import { 
  Leaf, 
  Recycle, 
  TreePine, 
  Sun, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Factory
} from 'lucide-react';

interface SustainabilityPageProps {
  onNavigate: (page: PageId) => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-10">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#152B1E] rounded-2xl text-white p-8 sm:p-14 relative overflow-hidden border border-[#274B35]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#203D2C] border border-[#345F45] text-[#E2C08D] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-[#E2C08D]" />
              <span>Core Value Spotlight</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Sustainability & Responsible Sourcing
            </h1>
            <p className="text-base sm:text-lg text-[#BCD8C7] leading-relaxed">
              At Arthco Investments, sustainability is not an afterthought—it is a founding core value. We champion responsible timber sourcing in the Eastern Highlands and zero-waste mill processing at our Nyakamete yard.
            </p>
          </div>
          <div className="absolute right-4 bottom-0 opacity-10 pointer-events-none">
            <Leaf className="w-80 h-80 text-white" />
          </div>
        </div>
      </section>

      {/* CORE SUSTAINABILITY PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pillar 1: Responsible Sourcing */}
          <div className="bg-white rounded-xl p-8 border border-[#D8E3DC] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E] mb-5">
                <TreePine className="w-6 h-6 text-[#1E432E]" />
              </div>
              <h3 className="text-xl font-bold text-[#14261C] mb-2">
                Certified Plantation Sourcing
              </h3>
              <p className="text-sm text-[#4E6657] leading-relaxed mb-4">
                We strictly avoid unmanaged indigenous forest clearing. 100% of our sawlogs are sourced from regulated, replanted commercial pine and eucalyptus estates across the Eastern Highlands mist belt.
              </p>
              <ul className="space-y-2 text-xs text-[#526D5E]">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Only mature, rotation-age sawlogs felled</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Active replanting cycles support forest continuity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Soil conservation on steep mountain logging tracks</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 2: 100% Log Recovery */}
          <div className="bg-white rounded-xl p-8 border border-[#D8E3DC] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E] mb-5">
                <Recycle className="w-6 h-6 text-[#1E432E]" />
              </div>
              <h3 className="text-xl font-bold text-[#14261C] mb-2">
                Zero-Waste Mill Policy
              </h3>
              <p className="text-sm text-[#4E6657] leading-relaxed mb-4">
                Nothing goes to waste in our Nyakamete yard. Our Wood-Mizer thin-kerf blades minimize sawdust volume, while every cubic centimeter of wood residue is converted into high-value secondary resources.
              </p>
              <ul className="space-y-2 text-xs text-[#526D5E]">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Clean pine sawdust repurposed for poultry bedding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Slabwood offcuts recovered for packaging & pallets</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>End trimmings utilized for clean industrial heating</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillar 3: Low-Carbon Construction */}
          <div className="bg-white rounded-xl p-8 border border-[#D8E3DC] shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#EBF3ED] flex items-center justify-center text-[#1E432E] mb-5">
                <Sun className="w-6 h-6 text-[#1E432E]" />
              </div>
              <h3 className="text-xl font-bold text-[#14261C] mb-2">
                Timber as a Carbon Sink
              </h3>
              <p className="text-sm text-[#4E6657] leading-relaxed mb-4">
                Unlike cement, bricks, and steel which generate massive greenhouse gas emissions during manufacturing, sawn timber locks in carbon dioxide for decades when installed in buildings.
              </p>
              <ul className="space-y-2 text-xs text-[#526D5E]">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Naturally sequestered atmospheric carbon</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Significantly lower embodied energy than concrete</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2C593F] mr-2 shrink-0 mt-0.5" />
                  <span>Superior natural thermal insulation for buildings</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CIRCULAR BIOMASS & LOG RECOVERY VISUAL FLOW */}
      <section className="bg-[#F0F5F2] py-14 border-y border-[#D6E3DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C28846] font-bold">
              Circular Economy in Action
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261C] mt-1">
              How Arthco Achieves 100% Log Recovery
            </h2>
            <p className="text-sm text-[#4E6657] mt-1">
              Every round sawlog entering our Nyakamete yard is completely utilized across diverse economic applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] text-center">
              <span className="text-2xl font-extrabold text-[#1E432E] block mb-1">65% – 70%</span>
              <h4 className="text-sm font-bold text-[#14261C] mb-2">Prime Sawn Timber</h4>
              <p className="text-xs text-[#556F60]">
                High-standard structural rafters, purlins, battens, and joinery boards for construction.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] text-center">
              <span className="text-2xl font-extrabold text-[#C28846] block mb-1">15% – 20%</span>
              <h4 className="text-sm font-bold text-[#14261C] mb-2">Secondary Packaging</h4>
              <p className="text-xs text-[#556F60]">
                Recovered slabwood resawn into industrial pallet bearers, export crates, and dunnage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] text-center">
              <span className="text-2xl font-extrabold text-[#2C593F] block mb-1">8% – 10%</span>
              <h4 className="text-sm font-bold text-[#14261C] mb-2">Clean Pine Sawdust</h4>
              <p className="text-xs text-[#556F60]">
                Supplied to poultry farmers for bird bedding, mushroom substrate, and organic compost.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] text-center">
              <span className="text-2xl font-extrabold text-[#8C5820] block mb-1">3% – 5%</span>
              <h4 className="text-sm font-bold text-[#14261C] mb-2">Biomass Fuel & Offcuts</h4>
              <p className="text-xs text-[#556F60]">
                Clean firewood and end blocks used for curing kilns, heating, and sustainable energy.
              </p>
            </div>
          </div>

          {/* On-Site Residue & Yard Real Photo */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border border-[#CCDCD2] shadow-sm relative h-56 group">
              <img
                src="/images/arthco_sawmill_yard.jpg"
                alt="Sawdust mounds and yard at Nyakamete"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] text-[#E2C08D] font-bold uppercase tracking-wider block">
                  Sawdust Recovery Area
                </span>
                <h4 className="text-sm font-bold text-white">
                  Golden Pine Sawdust Mounds at Nyakamete Yard
                </h4>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#CCDCD2] shadow-sm relative h-56 group">
              <img
                src="/images/arthco_timber_stack.jpg"
                alt="Sawn timber stacks air drying"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] text-[#E2C08D] font-bold uppercase tracking-wider block">
                  Solar Air Seasoning
                </span>
                <h4 className="text-sm font-bold text-white">
                  Naturally Cured Sawn Pine Timber Stacks
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY EMPOWERMENT IN MUTARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#172E21] text-white rounded-2xl p-8 sm:p-12 border border-[#2B523B]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center space-x-2 text-[#E2C08D] text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Community & Workforce Development</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Empowering the People of Mutare & Manicaland
              </h2>
              <p className="text-sm text-[#BCD4C5] leading-relaxed">
                As a proudly Zimbabwean timber company, we invest in our local workforce. We train youth and experienced operators in modern sawmilling safety, band saw maintenance, precise lumber grading, and professional transport logistics.
              </p>
              <p className="text-sm text-[#BCD4C5] leading-relaxed">
                By providing reliable local employment at our Nixwood 10314 Nyakamete yard, we support families and sustain the local craftsmanship culture of Zimbabwean carpenters and builders.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#11241A] p-6 rounded-xl border border-[#284935] space-y-3 text-center sm:text-left">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Our Community Commitments
              </h3>
              <ul className="space-y-2 text-xs text-[#9BBBA6]">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E2C08D] shrink-0" />
                  <span>Fair local wages and comprehensive safety gear</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E2C08D] shrink-0" />
                  <span>Vocational sawmill machine training</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E2C08D] shrink-0" />
                  <span>Support for Mutare small carpentry businesses</span>
                </li>
              </ul>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-3 w-full py-2 rounded-lg bg-[#C28846] hover:bg-[#D49855] text-[#142318] font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Inquire About Timber Supply
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
