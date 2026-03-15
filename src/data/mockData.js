// Mock data for GrowPack Eco Platform (frontend-only, no backend)

export const defaultUser = {
  name: 'Sarvar',
  level: 'Eco Hero',
  points: 120,
  growpacks: 12,
  plasticSaved: '3',
  plants: [
    {
      id: '1',
      name: 'Pomidor',
      plantDate: '2026-03-01',
      growthStage: 'Nihol',
      lastWatered: '2026-03-05',
      wateringReminder: "Haftasiga 2–3 marta sugʻoring",
      imageUrl: null
    },
    {
      id: '2',
      name: 'Bodring',
      plantDate: '2026-02-20',
      growthStage: 'Kichik o‘simlik',
      lastWatered: '2026-02-28',
      wateringReminder: 'Dalada tuproq qurib qolmasin',
      imageUrl: null
    },
    {
      id: '3',
      name: 'Rayhon',
      plantDate: '2026-01-10',
      growthStage: 'Yetilgan',
      lastWatered: '2026-03-06',
      wateringReminder: "Iliq suv bilan haftasiga bir necha bor sugʻoring",
      imageUrl: null
    },
    {
      id: '4',
      name: 'Achchiq qalampir',
      plantDate: '2026-03-05',
      growthStage: 'Urug‘',
      lastWatered: '2026-03-07',
      wateringReminder: 'Urugʻ davrida tuproq namligini doimiy ushlab turing',
      imageUrl: null
    }
  ],
  plantImages: []
};

export const cities = [
  { city: 'Tashkent', lat: 41.3111, lng: 69.2797, growpacks: 120 },
  { city: 'Samarkand', lat: 39.6542, lng: 66.9597, growpacks: 85 },
  { city: 'Bukhara', lat: 39.7681, lng: 64.4556, growpacks: 43 },
  { city: 'Fergana', lat: 40.3864, lng: 71.7864, growpacks: 28 },
  { city: 'Namangan', lat: 41.0, lng: 71.6667, growpacks: 19 }
];

export const growthStages = ['Urug‘', 'Nihol', 'Kichik o‘simlik', 'Yetilgan'];

export const leaderboardUsers = [
  { rank: 1, name: 'Sarvar', points: 120, growpacks: 12 },
  { rank: 2, name: 'Dilnoza', points: 98, growpacks: 10 },
  { rank: 3, name: 'Jasur', points: 85, growpacks: 9 },
  { rank: 4, name: 'Nilufar', points: 72, growpacks: 8 },
  { rank: 5, name: 'Aziz', points: 65, growpacks: 7 }
];

export const leaderboardUniversities = [
  { rank: 1, name: 'Tashkent State University', growpacks: 340 },
  { rank: 2, name: 'INHA University', growpacks: 210 },
  { rank: 3, name: 'Westminster University', growpacks: 180 }
];

export const leaderboardRestaurants = [
  { rank: 1, name: 'Eco Cafe Tashkent', growpacks: 520, discount: '15%' },
  { rank: 2, name: 'Green Kitchen', growpacks: 380, discount: '10%' },
  { rank: 3, name: 'Farm to Table', growpacks: 290, discount: '10%' }
];

export const globalStats = {
  totalGrowpacks: 12450,
  treesGrown: 8900,
  plasticReducedPercent: 42,
  monthlyData: [
    { month: 'Jan', growpacks: 1200, trees: 900 },
    { month: 'Feb', growpacks: 1500, trees: 1100 },
    { month: 'Mar', growpacks: 2100, trees: 1600 },
    { month: 'Apr', growpacks: 2400, trees: 1800 },
    { month: 'May', growpacks: 2800, trees: 2100 },
    { month: 'Jun', growpacks: 2350, trees: 1700 }
  ]
};

export const partners = [
  {
    id: '1',
    name: 'Eco Cafe Tashkent',
    logo: '🌱',
    discount: '15% off',
    location: 'Tashkent, Amir Temur St.',
    growpacks: 520
  },
  {
    id: '2',
    name: 'Green Kitchen',
    logo: '🥗',
    discount: '10% off',
    location: 'Samarkand, Registan Sq.',
    growpacks: 380
  },
  {
    id: '3',
    name: 'Farm to Table',
    logo: '🍃',
    discount: '10% off',
    location: 'Bukhara, Old City',
    growpacks: 290
  }
];

export const STORAGE_KEYS = {
  USER: 'growpack_user',
  THEME: 'growpack_theme',
  PLANTS: 'growpack_plants',
  PLANT_IMAGES: 'growpack_plant_images'
};
