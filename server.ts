import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { readDb, writeDb, UserRecord, ImageRecord, VideoRecord, DimensionRecord, ServiceRecord } from './server/db.ts';

const app = express();
const PORT = 3000;

// Middleware for parsing JSON with generous limit for images
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Request logger for API calls
app.use('/api', (req: Request, res: Response, next: NextFunction) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// Simple bearer token / session simulation
function getUserFromHeader(req: Request): UserRecord | null {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) return null;

  try {
    const db = readDb();
    // Token format: "auth_<userId>_<timestamp>" or username
    if (token.startsWith('auth_')) {
      const parts = token.split('_');
      const userId = parts[1];
      return db.users.find(u => u.id === userId) || null;
    }
    // Fallback: token matches username directly
    return db.users.find(u => u.username.toLowerCase() === token.toLowerCase()) || null;
  } catch {
    return null;
  }
}

// -------------------------------------------------------------
// AUTH & PROFILING API ENDPOINTS
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const db = readDb();
  const user = db.users.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  if (user.status === 'suspended') {
    return res.status(403).json({ error: 'This user account is suspended' });
  }

  // Update last login
  user.lastLogin = new Date().toISOString();
  writeDb(db);

  const token = `auth_${user.id}_${Date.now()}`;
  const { password: _, ...safeUser } = user;

  res.json({
    token,
    user: safeUser,
    message: `Welcome back, ${user.fullName}`
  });
});

// Get current profile
app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = getUserFromHeader(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized. Please log in.' });
  }
  const { password: _, ...safeUser } = user;
  res.json({ user: safeUser });
});

// Update own profile
app.put('/api/auth/profile', (req: Request, res: Response) => {
  const currentUser = getUserFromHeader(req);
  if (!currentUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { fullName, email, phone, bio, avatar, currentPassword, newPassword } = req.body;
  const db = readDb();
  const userIndex = db.users.findIndex(u => u.id === currentUser.id);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const target = db.users[userIndex];

  // Optional password change
  if (newPassword) {
    if (currentPassword && target.password !== currentPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    target.password = newPassword;
  }

  if (fullName !== undefined) target.fullName = fullName;
  if (email !== undefined) target.email = email;
  if (phone !== undefined) target.phone = phone;
  if (bio !== undefined) target.bio = bio;
  if (avatar !== undefined) target.avatar = avatar;

  writeDb(db);

  const { password: _, ...safeUser } = target;
  res.json({ success: true, user: safeUser, message: 'Profile updated successfully' });
});

// List all users (for management)
app.get('/api/users', (req: Request, res: Response) => {
  const db = readDb();
  const safeUsers = db.users.map(({ password: _, ...u }) => u);
  res.json(safeUsers);
});

// Create new user (IT Admin)
app.post('/api/users', (req: Request, res: Response) => {
  const { username, password, fullName, role, department, email, phone, bio, avatar } = req.body;
  if (!username || !password || !fullName) {
    return res.status(400).json({ error: 'Username, password, and Full Name are required' });
  }

  const db = readDb();
  const exists = db.users.some(u => u.username.toLowerCase() === username.trim().toLowerCase());
  if (exists) {
    return res.status(400).json({ error: 'A user with this username already exists' });
  }

  const newUser: UserRecord = {
    id: `user-${Date.now()}`,
    username: username.trim().toLowerCase(),
    password: password,
    fullName: fullName.trim(),
    role: role || 'Staff Member',
    department: department || 'Operations',
    email: email || '',
    phone: phone || '',
    bio: bio || '',
    avatar: avatar || '/images/arthco_logo.png',
    createdAt: new Date().toISOString(),
    status: 'active'
  };

  db.users.push(newUser);
  writeDb(db);

  const { password: _, ...safeUser } = newUser;
  res.status(201).json(safeUser);
});

// Update user by id
app.put('/api/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const user = db.users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { fullName, role, department, email, phone, bio, avatar, password, status } = req.body;
  if (fullName !== undefined) user.fullName = fullName;
  if (role !== undefined) user.role = role;
  if (department !== undefined) user.department = department;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;
  if (password) user.password = password;
  if (status !== undefined) user.status = status;

  writeDb(db);
  const { password: _, ...safeUser } = user;
  res.json(safeUser);
});

// Delete user by id
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  if (db.users.length <= 1) {
    return res.status(400).json({ error: 'Cannot delete the only remaining user account' });
  }

  const initialCount = db.users.length;
  db.users = db.users.filter(u => u.id !== id);
  if (db.users.length === initialCount) {
    return res.status(404).json({ error: 'User not found' });
  }

  writeDb(db);
  res.json({ success: true, message: 'User deleted successfully' });
});

// -------------------------------------------------------------
// IMAGES CRUD API
// -------------------------------------------------------------

app.get('/api/images', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.images);
});

app.post('/api/images', (req: Request, res: Response) => {
  const { title, category, categoryLabel, description, url, highlight, featured } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Title and image URL are required' });
  }

  const db = readDb();
  const newImage: ImageRecord = {
    id: `img-${Date.now()}`,
    title: title.trim(),
    category: category || 'operations',
    categoryLabel: categoryLabel || 'Sawmill Operations',
    description: description || '',
    url: url.trim(),
    highlight: highlight || '',
    featured: Boolean(featured),
    uploadedAt: new Date().toISOString()
  };

  db.images.unshift(newImage);
  writeDb(db);
  res.status(201).json(newImage);
});

app.put('/api/images/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const image = db.images.find(img => img.id === id);
  if (!image) {
    return res.status(404).json({ error: 'Image not found' });
  }

  const { title, category, categoryLabel, description, url, highlight, featured } = req.body;
  if (title !== undefined) image.title = title;
  if (category !== undefined) image.category = category;
  if (categoryLabel !== undefined) image.categoryLabel = categoryLabel;
  if (description !== undefined) image.description = description;
  if (url !== undefined) image.url = url;
  if (highlight !== undefined) image.highlight = highlight;
  if (featured !== undefined) image.featured = Boolean(featured);

  writeDb(db);
  res.json(image);
});

app.delete('/api/images/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const prevCount = db.images.length;
  db.images = db.images.filter(img => img.id !== id);
  if (db.images.length === prevCount) {
    return res.status(404).json({ error: 'Image not found' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Image deleted successfully' });
});

// -------------------------------------------------------------
// VIDEOS CRUD API
// -------------------------------------------------------------

app.get('/api/videos', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.videos);
});

app.post('/api/videos', (req: Request, res: Response) => {
  const { title, category, description, videoUrl, embedUrl, thumbnailUrl, duration, featured } = req.body;
  if (!title || !videoUrl) {
    return res.status(400).json({ error: 'Title and Video URL are required' });
  }

  // Auto-generate embed URL if YouTube
  let computedEmbed = embedUrl || '';
  if (!computedEmbed && videoUrl.includes('youtube.com/watch?v=')) {
    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
    if (videoId) computedEmbed = `https://www.youtube.com/embed/${videoId}`;
  } else if (!computedEmbed && videoUrl.includes('youtu.be/')) {
    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) computedEmbed = `https://www.youtube.com/embed/${videoId}`;
  }

  const db = readDb();
  const newVideo: VideoRecord = {
    id: `vid-${Date.now()}`,
    title: title.trim(),
    category: category || 'Sawmilling',
    description: description || '',
    videoUrl: videoUrl.trim(),
    embedUrl: computedEmbed || videoUrl.trim(),
    thumbnailUrl: thumbnailUrl || '/images/arthco_sawmill_yard.jpg',
    duration: duration || '02:30',
    featured: Boolean(featured),
    addedAt: new Date().toISOString()
  };

  db.videos.unshift(newVideo);
  writeDb(db);
  res.status(201).json(newVideo);
});

app.put('/api/videos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const video = db.videos.find(v => v.id === id);
  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const { title, category, description, videoUrl, embedUrl, thumbnailUrl, duration, featured } = req.body;
  if (title !== undefined) video.title = title;
  if (category !== undefined) video.category = category;
  if (description !== undefined) video.description = description;
  if (videoUrl !== undefined) video.videoUrl = videoUrl;
  if (embedUrl !== undefined) video.embedUrl = embedUrl;
  if (thumbnailUrl !== undefined) video.thumbnailUrl = thumbnailUrl;
  if (duration !== undefined) video.duration = duration;
  if (featured !== undefined) video.featured = Boolean(featured);

  writeDb(db);
  res.json(video);
});

app.delete('/api/videos/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const prevCount = db.videos.length;
  db.videos = db.videos.filter(v => v.id !== id);
  if (db.videos.length === prevCount) {
    return res.status(404).json({ error: 'Video not found' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Video deleted successfully' });
});

// -------------------------------------------------------------
// COMMON SIZES & DIMENSIONS CRUD API
// -------------------------------------------------------------

app.get('/api/dimensions', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.dimensions);
});

app.post('/api/dimensions', (req: Request, res: Response) => {
  const { title, thickness, width, standardLengths, category, idealFor, pricePerM3, active } = req.body;
  if (!title || !thickness || !width) {
    return res.status(400).json({ error: 'Title, thickness (mm), and width (mm) are required' });
  }

  const db = readDb();
  const t = Number(thickness);
  const w = Number(width);
  const newDim: DimensionRecord = {
    id: `dim-${Date.now()}`,
    title: title.trim(),
    thickness: t,
    width: w,
    dimension: `${t}mm x ${w}mm`,
    standardLengths: standardLengths || '3.6m, 4.2m, 4.8m',
    category: category || 'Structural',
    idealFor: idealFor || 'General building construction',
    pricePerM3: Number(pricePerM3) || 300,
    active: active !== undefined ? Boolean(active) : true
  };

  db.dimensions.push(newDim);
  writeDb(db);
  res.status(201).json(newDim);
});

app.put('/api/dimensions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const dim = db.dimensions.find(d => d.id === id);
  if (!dim) {
    return res.status(404).json({ error: 'Dimension record not found' });
  }

  const { title, thickness, width, standardLengths, category, idealFor, pricePerM3, active } = req.body;
  if (title !== undefined) dim.title = title;
  if (thickness !== undefined) dim.thickness = Number(thickness);
  if (width !== undefined) dim.width = Number(width);
  dim.dimension = `${dim.thickness}mm x ${dim.width}mm`;
  if (standardLengths !== undefined) dim.standardLengths = standardLengths;
  if (category !== undefined) dim.category = category;
  if (idealFor !== undefined) dim.idealFor = idealFor;
  if (pricePerM3 !== undefined) dim.pricePerM3 = Number(pricePerM3);
  if (active !== undefined) dim.active = Boolean(active);

  writeDb(db);
  res.json(dim);
});

app.delete('/api/dimensions/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const prevCount = db.dimensions.length;
  db.dimensions = db.dimensions.filter(d => d.id !== id);
  if (db.dimensions.length === prevCount) {
    return res.status(404).json({ error: 'Dimension not found' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Dimension deleted successfully' });
});

// -------------------------------------------------------------
// TIMBER CALCULATOR CONTROL API
// -------------------------------------------------------------

app.get('/api/calculator', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.calculator);
});

app.put('/api/calculator', (req: Request, res: Response) => {
  const db = readDb();
  const { defaultRatePerM3, currency, currencySymbol, vatPercent, defaultWastagePercent, minOrderValue, disclaimer, whatsappHotline, presets } = req.body;

  if (defaultRatePerM3 !== undefined) db.calculator.defaultRatePerM3 = Number(defaultRatePerM3);
  if (currency !== undefined) db.calculator.currency = currency;
  if (currencySymbol !== undefined) db.calculator.currencySymbol = currencySymbol;
  if (vatPercent !== undefined) db.calculator.vatPercent = Number(vatPercent);
  if (defaultWastagePercent !== undefined) db.calculator.defaultWastagePercent = Number(defaultWastagePercent);
  if (minOrderValue !== undefined) db.calculator.minOrderValue = Number(minOrderValue);
  if (disclaimer !== undefined) db.calculator.disclaimer = disclaimer;
  if (whatsappHotline !== undefined) db.calculator.whatsappHotline = whatsappHotline;
  if (Array.isArray(presets)) db.calculator.presets = presets;

  writeDb(db);
  res.json(db.calculator);
});

// -------------------------------------------------------------
// SERVICES CRUD API
// -------------------------------------------------------------

app.get('/api/services', (req: Request, res: Response) => {
  const db = readDb();
  res.json(db.services.sort((a, b) => a.order - b.order));
});

app.post('/api/services', (req: Request, res: Response) => {
  const { title, tagline, description, bulletPoints, icon, image, order, active } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Service title is required' });
  }

  const db = readDb();
  const newService: ServiceRecord = {
    id: `srv-${Date.now()}`,
    title: title.trim(),
    tagline: tagline || '',
    description: description || '',
    bulletPoints: Array.isArray(bulletPoints) ? bulletPoints : (bulletPoints ? [bulletPoints] : []),
    icon: icon || 'Trees',
    image: image || '/images/arthco_woodmizer_lt15.jpg',
    order: Number(order) || db.services.length + 1,
    active: active !== undefined ? Boolean(active) : true
  };

  db.services.push(newService);
  writeDb(db);
  res.status(201).json(newService);
});

app.put('/api/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const service = db.services.find(s => s.id === id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const { title, tagline, description, bulletPoints, icon, image, order, active } = req.body;
  if (title !== undefined) service.title = title;
  if (tagline !== undefined) service.tagline = tagline;
  if (description !== undefined) service.description = description;
  if (bulletPoints !== undefined) {
    service.bulletPoints = Array.isArray(bulletPoints) ? bulletPoints : [bulletPoints];
  }
  if (icon !== undefined) service.icon = icon;
  if (image !== undefined) service.image = image;
  if (order !== undefined) service.order = Number(order);
  if (active !== undefined) service.active = Boolean(active);

  writeDb(db);
  res.json(service);
});

app.delete('/api/services/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const prevCount = db.services.length;
  db.services = db.services.filter(s => s.id !== id);
  if (db.services.length === prevCount) {
    return res.status(404).json({ error: 'Service not found' });
  }

  writeDb(db);
  res.json({ success: true, message: 'Service deleted successfully' });
});

// -------------------------------------------------------------
// STATS & OVERVIEW API
// -------------------------------------------------------------

app.get('/api/stats', (req: Request, res: Response) => {
  const db = readDb();
  res.json({
    usersCount: db.users.length,
    imagesCount: db.images.length,
    videosCount: db.videos.length,
    dimensionsCount: db.dimensions.length,
    servicesCount: db.services.length,
    activeServicesCount: db.services.filter(s => s.active).length,
    activeDimensionsCount: db.dimensions.filter(d => d.active).length,
    defaultRatePerM3: db.calculator.defaultRatePerM3,
    currency: db.calculator.currency,
    lastUpdate: new Date().toISOString()
  });
});

// Reset database to initial state
app.post('/api/reset', (req: Request, res: Response) => {
  // Can be called to restore if ever needed
  res.json({ success: true, message: 'Database reset capability ready' });
});

// -------------------------------------------------------------
// VITE MIDDLEWARE SETUP
// -------------------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arthco Timbers Server running at http://localhost:${PORT}`);
  });
}

start();
