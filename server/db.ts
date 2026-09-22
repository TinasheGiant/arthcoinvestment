import fs from 'fs';
import path from 'path';

export interface UserRecord {
  id: string;
  username: string;
  password?: string;
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

export interface ImageRecord {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  url: string;
  highlight?: string;
  featured: boolean;
  uploadedAt: string;
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

export interface ServiceRecord {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bulletPoints: string[];
  icon: string;
  image: string;
  order: number;
  active: boolean;
}

export interface DatabaseSchema {
  users: UserRecord[];
  images: ImageRecord[];
  videos: VideoRecord[];
  dimensions: DimensionRecord[];
  calculator: CalculatorSettings;
  services: ServiceRecord[];
}

const DB_FILE = path.join(process.cwd(), 'server', 'db.json');

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      throw new Error(`DB file not found at ${DB_FILE}`);
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    throw err;
  }
}

export function writeDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db.json:', err);
    throw err;
  }
}
