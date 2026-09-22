export type PageId = 'home' | 'services' | 'about' | 'sustainability' | 'gallery' | 'contact';

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
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'operations' | 'products' | 'yard' | 'sustainability';
  categoryLabel: string;
  description: string;
  url: string;
  highlight?: string;
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
