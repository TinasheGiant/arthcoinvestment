import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  GalleryImage,
  VideoRecord,
  DimensionRecord,
  CalculatorSettings,
  ServiceItem,
  UserRecord
} from '../types';
import {
  GALLERY_ITEMS as DEFAULT_GALLERY,
  SERVICES_LIST as DEFAULT_SERVICES,
  TIMBER_SPECS_GUIDE as DEFAULT_SPECS
} from '../data/timberData';
import {
  api,
  getStoredToken,
  getStoredUser,
  setStoredAuth,
  clearStoredAuth
} from '../services/api';

const DEFAULT_CALCULATOR: CalculatorSettings = {
  defaultRatePerM3: 310,
  currency: 'USD',
  currencySymbol: '$',
  vatPercent: 15,
  defaultWastagePercent: 10,
  minOrderValue: 50,
  disclaimer: 'Rates are indicative ex-mill prices in USD at Nixwood 10314, Nyakamete, Mutare. Exact quotes depend on grade, treatment (CCA), and delivery distance.',
  whatsappHotline: '263773412197',
  presets: [
    { id: 'pre-1', label: '38 x 38 (Battens)', thickness: 38, width: 38, length: 3.6, defaultPieces: 100, category: 'Roofing' },
    { id: 'pre-2', label: '38 x 76 (Purlins)', thickness: 38, width: 76, length: 4.8, defaultPieces: 60, category: 'Roofing' },
    { id: 'pre-3', label: '38 x 114 (Rafters)', thickness: 38, width: 114, length: 4.8, defaultPieces: 50, category: 'Structural' },
    { id: 'pre-4', label: '38 x 152 (Joists)', thickness: 38, width: 152, length: 5.4, defaultPieces: 30, category: 'Structural' },
    { id: 'pre-5', label: '50 x 76 (Wall Plates)', thickness: 50, width: 76, length: 4.8, defaultPieces: 40, category: 'Structural' },
    { id: 'pre-6', label: '25 x 150 (Planks)', thickness: 25, width: 150, length: 3.6, defaultPieces: 40, category: 'Boards' },
  ]
};

const DEFAULT_DIMENSIONS: DimensionRecord[] = DEFAULT_SPECS.map((spec, i) => {
  const parts = spec.dimension.split('x').map(s => parseInt(s.replace(/[^0-9]/g, ''), 10));
  return {
    id: `dim-${i + 1}`,
    title: spec.title,
    thickness: parts[0] || 38,
    width: parts[1] || 114,
    dimension: spec.dimension,
    standardLengths: spec.commonLengths,
    category: 'Structural',
    idealFor: spec.idealFor,
    pricePerM3: 310,
    active: true
  };
});

const DEFAULT_VIDEOS: VideoRecord[] = [
  {
    id: 'vid-1',
    title: 'Wood-Mizer LT15 Band Sawmill in Operation',
    category: 'Sawmilling',
    description: 'Watch our thin-kerf band blade slice through Eastern Highlands pine logs at Nixwood 10314, Nyakamete, Mutare with surgical precision.',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    thumbnailUrl: '/images/arthco_woodmizer_lt15.jpg',
    duration: '03:45',
    featured: true,
    addedAt: '2026-09-20T12:00:00.000Z'
  },
  {
    id: 'vid-2',
    title: 'Timber Stacking, Grading & Air Seasoning',
    category: 'Quality Control',
    description: 'Detailed walkthrough of how our sawmill crew inspects knot integrity, aligns timber sticks, and creates balanced drying stacks in our yard.',
    videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    thumbnailUrl: '/images/arthco_timber_stack.jpg',
    duration: '02:18',
    featured: true,
    addedAt: '2026-09-21T09:30:00.000Z'
  }
];

interface DataContextType {
  images: GalleryImage[];
  videos: VideoRecord[];
  dimensions: DimensionRecord[];
  calculatorSettings: CalculatorSettings;
  services: ServiceItem[];
  currentUser: UserRecord | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<UserRecord>;
  logout: () => void;
  updateProfile: (profileData: Partial<UserRecord> & { currentPassword?: string; newPassword?: string }) => Promise<UserRecord>;

  // Images CRUD
  addImage: (image: Partial<GalleryImage>) => Promise<GalleryImage>;
  updateImage: (id: string, image: Partial<GalleryImage>) => Promise<GalleryImage>;
  deleteImage: (id: string) => Promise<void>;

  // Videos CRUD
  addVideo: (video: Partial<VideoRecord>) => Promise<VideoRecord>;
  updateVideo: (id: string, video: Partial<VideoRecord>) => Promise<VideoRecord>;
  deleteVideo: (id: string) => Promise<void>;

  // Dimensions CRUD
  addDimension: (dim: Partial<DimensionRecord>) => Promise<DimensionRecord>;
  updateDimension: (id: string, dim: Partial<DimensionRecord>) => Promise<DimensionRecord>;
  deleteDimension: (id: string) => Promise<void>;

  // Calculator Settings CRUD
  updateCalculator: (settings: Partial<CalculatorSettings>) => Promise<CalculatorSettings>;

  // Services CRUD
  addService: (service: Partial<ServiceItem>) => Promise<ServiceItem>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<ServiceItem>;
  deleteService: (id: string) => Promise<void>;

  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<GalleryImage[]>(DEFAULT_GALLERY);
  const [videos, setVideos] = useState<VideoRecord[]>(DEFAULT_VIDEOS);
  const [dimensions, setDimensions] = useState<DimensionRecord[]>(DEFAULT_DIMENSIONS);
  const [calculatorSettings, setCalculatorSettings] = useState<CalculatorSettings>(DEFAULT_CALCULATOR);
  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [currentUser, setCurrentUser] = useState<UserRecord | null>(getStoredUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [imgs, vids, dims, calc, srvs] = await Promise.all([
        api.getImages().catch(() => DEFAULT_GALLERY),
        api.getVideos().catch(() => DEFAULT_VIDEOS),
        api.getDimensions().catch(() => DEFAULT_DIMENSIONS),
        api.getCalculator().catch(() => DEFAULT_CALCULATOR),
        api.getServices().catch(() => DEFAULT_SERVICES),
      ]);

      setImages(imgs);
      setVideos(vids);
      setDimensions(dims);
      setCalculatorSettings(calc);
      setServices(srvs);
      setError(null);
    } catch (err: unknown) {
      console.warn('Backend load notice (using initial data):', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check initial user token validity
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      api.getMe()
        .then(res => {
          setCurrentUser(res.user);
          setStoredAuth(token, res.user);
        })
        .catch(() => {
          // Token expired or invalid
          clearStoredAuth();
          setCurrentUser(null);
        });
    }
    fetchAllData();
  }, [fetchAllData]);

  // Auth
  const login = async (username: string, password: string): Promise<UserRecord> => {
    const res = await api.login(username, password);
    setStoredAuth(res.token, res.user);
    setCurrentUser(res.user);
    return res.user;
  };

  const logout = () => {
    clearStoredAuth();
    setCurrentUser(null);
  };

  const updateProfile = async (profileData: Partial<UserRecord> & { currentPassword?: string; newPassword?: string }): Promise<UserRecord> => {
    const res = await api.updateProfile(profileData);
    setCurrentUser(res.user);
    const token = getStoredToken();
    if (token) {
      setStoredAuth(token, res.user);
    }
    return res.user;
  };

  // Images CRUD
  const addImage = async (imgData: Partial<GalleryImage>): Promise<GalleryImage> => {
    const created = await api.createImage(imgData);
    setImages(prev => [created, ...prev]);
    return created;
  };

  const updateImage = async (id: string, imgData: Partial<GalleryImage>): Promise<GalleryImage> => {
    const updated = await api.updateImage(id, imgData);
    setImages(prev => prev.map(img => img.id === id ? updated : img));
    return updated;
  };

  const deleteImage = async (id: string): Promise<void> => {
    await api.deleteImage(id);
    setImages(prev => prev.filter(img => img.id !== id));
  };

  // Videos CRUD
  const addVideo = async (videoData: Partial<VideoRecord>): Promise<VideoRecord> => {
    const created = await api.createVideo(videoData);
    setVideos(prev => [created, ...prev]);
    return created;
  };

  const updateVideo = async (id: string, videoData: Partial<VideoRecord>): Promise<VideoRecord> => {
    const updated = await api.updateVideo(id, videoData);
    setVideos(prev => prev.map(v => v.id === id ? updated : v));
    return updated;
  };

  const deleteVideo = async (id: string): Promise<void> => {
    await api.deleteVideo(id);
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Dimensions CRUD
  const addDimension = async (dimData: Partial<DimensionRecord>): Promise<DimensionRecord> => {
    const created = await api.createDimension(dimData);
    setDimensions(prev => [...prev, created]);
    return created;
  };

  const updateDimension = async (id: string, dimData: Partial<DimensionRecord>): Promise<DimensionRecord> => {
    const updated = await api.updateDimension(id, dimData);
    setDimensions(prev => prev.map(d => d.id === id ? updated : d));
    return updated;
  };

  const deleteDimension = async (id: string): Promise<void> => {
    await api.deleteDimension(id);
    setDimensions(prev => prev.filter(d => d.id !== id));
  };

  // Calculator Settings
  const updateCalculator = async (settings: Partial<CalculatorSettings>): Promise<CalculatorSettings> => {
    const updated = await api.updateCalculator(settings);
    setCalculatorSettings(updated);
    return updated;
  };

  // Services CRUD
  const addService = async (srvData: Partial<ServiceItem>): Promise<ServiceItem> => {
    const created = await api.createService(srvData);
    setServices(prev => [...prev, created].sort((a, b) => (a.order || 0) - (b.order || 0)));
    return created;
  };

  const updateService = async (id: string, srvData: Partial<ServiceItem>): Promise<ServiceItem> => {
    const updated = await api.updateService(id, srvData);
    setServices(prev => prev.map(s => s.id === id ? updated : s).sort((a, b) => (a.order || 0) - (b.order || 0)));
    return updated;
  };

  const deleteService = async (id: string): Promise<void> => {
    await api.deleteService(id);
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        images,
        videos,
        dimensions,
        calculatorSettings,
        services,
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        error,
        login,
        logout,
        updateProfile,
        addImage,
        updateImage,
        deleteImage,
        addVideo,
        updateVideo,
        deleteVideo,
        addDimension,
        updateDimension,
        deleteDimension,
        updateCalculator,
        addService,
        updateService,
        deleteService,
        refreshData: fetchAllData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
