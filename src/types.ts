export type PageId = 'home' | 'services' | 'about' | 'sustainability' | 'gallery' | 'contact' | 'admin';

export interface CoreValue {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface TimberProduct {
  id: string;
  name: string;
  category: 'Structural' | 'Roofing' | 'Planks & Boards' | 'Industrial & Packaging';
  standardSizes: string[];
  description: string;
  applications: string[];
  species: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  icon: string;
  image: string;
  order?: number;
  active?: boolean;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  categoryLabel?: string;
  description: string;
  url: string;
  highlight?: string;
  featured?: boolean;
  uploadedAt?: string;
  placement?: 'gallery' | 'homepage_spotlight' | 'services' | 'about' | 'sustainability' | 'all';
  targetServiceId?: string;
}

export interface VideoRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration?: string;
  featured: boolean;
  addedAt: string;
  placement?: 'gallery' | 'homepage' | 'services' | 'all';
}

export interface DimensionRecord {
  id: string;
  title: string;
  thickness: number;
  width: number;
  dimension: string;
  standardLengths: string;
  category: string;
  idealFor: string;
  pricePerM3: number;
  active: boolean;
}

export interface CalculatorPreset {
  id: string;
  label: string;
  thickness: number;
  width: number;
  length: number;
  defaultPieces: number;
  category: string;
}

export interface CalculatorSettings {
  defaultRatePerM3: number;
  currency: string;
  currencySymbol: string;
  vatPercent: number;
  defaultWastagePercent: number;
  minOrderValue: number;
  disclaimer: string;
  whatsappHotline: string;
  presets: CalculatorPreset[];
}

export interface UserRecord {
  id: string;
  username: string;
  fullName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'suspended';
}

export interface QuoteRequest {
  name: string;
  phone: string;
  email: string;
  productType: string;
  quantity: string;
  destination: string;
  notes: string;
}
