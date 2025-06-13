// src/data/demoData.ts
export interface DemoUser {
  id: string;
  artistId: number;
  email: string;
  password: string;
  name: string;
  bio?: string;
  location?: string;
  specialties?: string[];
  joinDate: string;
  profileImage?: string;
  coverImage?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    etsy?: string;
  };
}

export interface DemoProduct {
  id: string;
  artistId: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  discount?: number;
  category: string;
  materials?: string[];
  dimensions?: string;
  images?: string[];
  createdAt: string;
  inStock: boolean;
  stockQuantity: number;
}

export interface DemoReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

// Demo Users
export const demoUsers: DemoUser[] = [
  {
    id: "user_0",
    artistId: 0,
    email: "demo@example.com",
    password: "password",
    name: "Demo User",
    bio: "Welcome to Handcrafted Haven! This is a demo account to explore our platform.",
    location: "San Francisco, CA",
    specialties: ["Platform Testing", "Demo Content"],
    joinDate: "2024-01-15",
    profileImage: "/api/placeholder/150/150",
  },
  {
    id: "user_1",
    artistId: 1,
    email: "artisan1@example.com",
    password: "password",
    name: "Sarah Chen",
    bio: "Passionate ceramic artist with over 10 years of experience creating functional and decorative pottery. I draw inspiration from nature and traditional Japanese techniques, combining them with modern aesthetics to create unique pieces that bring beauty and functionality to everyday life.",
    location: "Portland, OR",
    specialties: ["Ceramics", "Pottery", "Glazing"],
    joinDate: "2023-06-20",
    profileImage: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/800/300",
    website: "www.sarahchenart.com",
    socialMedia: {
      instagram: "@sarahchenart",
      facebook: "Sarah Chen Ceramics",
    },
  },
  {
    id: "user_2",
    artistId: 2,
    email: "artisan2@example.com",
    password: "password",
    name: "Marcus Rodriguez",
    bio: "Master woodworker specializing in custom furniture and home decor. Each piece is handcrafted using sustainable materials and traditional joinery techniques passed down through generations. I believe in creating heirloom-quality pieces that tell a story.",
    location: "Austin, TX",
    specialties: ["Woodworking", "Furniture", "Custom Design"],
    joinDate: "2023-08-15",
    profileImage: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/800/300",
    website: "www.rodriguezwoodworks.com",
    socialMedia: {
      instagram: "@rodriguezwoodworks",
      etsy: "RodriguezCustomFurniture",
    },
  },
];

// Helper function to check if product is new (less than 7 days old)
const isProductNew = (createdAt: string): boolean => {
  const now = new Date();
  const productDate = new Date(createdAt);
  const diffTime = Math.abs(now.getTime() - productDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

// Enhanced Products with Artist IDs and Created Dates
export const demoProducts: DemoProduct[] = [
  {
    id: "1",
    artistId: 1,
    name: "Handcrafted Ceramic Vase",
    description:
      "Beautiful blue glaze ceramic vase, perfect for fresh flowers or as a standalone decorative piece. Hand-thrown on the pottery wheel with a unique crystalline glaze.",
    price: 85,
    originalPrice: 100,
    rating: 4.8,
    reviewCount: 24,
    isNew: isProductNew("2024-06-05"),
    discount: 15,
    category: "Ceramics",
    materials: ["Clay", "Ceramic Glaze"],
    dimensions: '8" H x 4" W',
    createdAt: "2024-06-05",
    inStock: true,
    stockQuantity: 3,
  },
  {
    id: "2",
    artistId: 1,
    name: "Sterling Silver Necklace",
    description:
      "Elegant handcrafted sterling silver necklace with intricate wire-wrapped pendant. 18-inch chain with adjustable clasp.",
    price: 120,
    rating: 4.9,
    reviewCount: 42,
    isNew: isProductNew("2024-06-08"),
    category: "Jewelry",
    materials: ["Sterling Silver"],
    dimensions: '18" chain length',
    createdAt: "2024-06-08",
    inStock: true,
    stockQuantity: 5,
  },
  {
    id: "3",
    artistId: 2,
    name: "Wooden Coffee Table",
    description:
      "Rustic oak coffee table with natural edge and hand-rubbed finish. Features traditional mortise and tenon joinery for lasting durability.",
    price: 350,
    rating: 4.7,
    reviewCount: 18,
    isNew: isProductNew("2024-05-20"),
    category: "Furniture",
    materials: ["Oak Wood", "Natural Oil Finish"],
    dimensions: '48" L x 24" W x 18" H',
    createdAt: "2024-05-20",
    inStock: true,
    stockQuantity: 1,
  },
  {
    id: "4",
    artistId: 2,
    name: "Hand-woven Throw Blanket",
    description:
      "Cozy wool blend throw blanket in earth tones. Hand-woven on a traditional loom with natural dyes.",
    price: 95,
    originalPrice: 120,
    rating: 4.6,
    reviewCount: 31,
    isNew: isProductNew("2024-06-01"),
    discount: 20,
    category: "Textiles",
    materials: ["Wool Blend", "Natural Dyes"],
    dimensions: '60" L x 45" W',
    createdAt: "2024-06-01",
    inStock: true,
    stockQuantity: 4,
  },
  {
    id: "5",
    artistId: 1,
    name: "Glass Art Sculpture",
    description:
      "Mesmerizing blue and green glass sculpture created using traditional glassblowing techniques. Each piece is unique.",
    price: 180,
    rating: 4.5,
    reviewCount: 12,
    isNew: isProductNew("2024-06-09"),
    category: "Glass Art",
    materials: ["Borosilicate Glass"],
    dimensions: '6" H x 4" W x 4" D',
    createdAt: "2024-06-09",
    inStock: true,
    stockQuantity: 2,
  },
  {
    id: "6",
    artistId: 2,
    name: "Leather Wallet",
    description:
      "Handstitched brown leather wallet with multiple card slots and bill compartment. Made from full-grain leather.",
    price: 45,
    rating: 4.8,
    reviewCount: 67,
    isNew: isProductNew("2024-05-25"),
    category: "Leather Goods",
    materials: ["Full-grain Leather", "Waxed Thread"],
    dimensions: '4.5" L x 3.5" W x 0.5" H',
    createdAt: "2024-05-25",
    inStock: true,
    stockQuantity: 8,
  },
  {
    id: "7",
    artistId: 1,
    name: "Ceramic Dinner Plates Set",
    description:
      "Set of 4 handcrafted ceramic dinner plates with beautiful white glaze and subtle texture. Microwave and dishwasher safe.",
    price: 75,
    rating: 4.4,
    reviewCount: 23,
    isNew: isProductNew("2024-05-30"),
    category: "Ceramics",
    materials: ["Stoneware Clay", "Food-safe Glaze"],
    dimensions: '10" diameter each',
    createdAt: "2024-05-30",
    inStock: true,
    stockQuantity: 6,
  },
  {
    id: "8",
    artistId: 1,
    name: "Macrame Wall Hanging",
    description:
      "Large macrame wall hanging made with natural cotton cord. Perfect for bohemian or modern home decor.",
    price: 65,
    rating: 4.7,
    reviewCount: 35,
    isNew: isProductNew("2024-06-07"),
    category: "Textiles",
    materials: ["Natural Cotton Cord"],
    dimensions: '36" L x 24" W',
    createdAt: "2024-06-07",
    inStock: true,
    stockQuantity: 3,
  },
  {
    id: "9",
    artistId: 2,
    name: "Handmade Soap Set",
    description:
      "Set of 3 lavender-scented handmade soaps with natural ingredients. Made with organic oils and essential oils.",
    price: 25,
    rating: 4.6,
    reviewCount: 89,
    isNew: isProductNew("2024-06-03"),
    category: "Bath & Body",
    materials: ["Organic Oils", "Lavender Essential Oil", "Natural Colorants"],
    dimensions: '3" L x 2" W x 1" H each',
    createdAt: "2024-06-03",
    inStock: true,
    stockQuantity: 12,
  },
  {
    id: "10",
    artistId: 2,
    name: "Custom Wood Sign",
    description:
      "Personalized pine wood sign with hand-carved text. Perfect for home decor or business signage.",
    price: 55,
    originalPrice: 70,
    rating: 4.9,
    reviewCount: 15,
    isNew: isProductNew("2024-06-04"),
    discount: 21,
    category: "Wood Crafts",
    materials: ["Pine Wood", "Natural Stain"],
    dimensions: '12" L x 8" W x 1" H',
    createdAt: "2024-06-04",
    inStock: true,
    stockQuantity: 5,
  },
];

// Sample Reviews
export const demoReviews: DemoReview[] = [
  {
    id: "review_1",
    productId: "1",
    userId: "user_0",
    userName: "Demo User",
    rating: 5,
    comment:
      "Absolutely beautiful ceramic vase! The blue glaze is stunning and the craftsmanship is exceptional. It arrived perfectly packaged and looks even better in person.",
    createdAt: "2024-06-08",
    helpful: 8,
  },
  {
    id: "review_2",
    productId: "1",
    userId: "user_2",
    userName: "Marcus Rodriguez",
    rating: 5,
    comment:
      "Sarah's work is always top-notch. This vase is a perfect centerpiece for my dining table. The quality is outstanding!",
    createdAt: "2024-06-07",
    helpful: 5,
  },
  {
    id: "review_3",
    productId: "3",
    userId: "user_0",
    userName: "Demo User",
    rating: 5,
    comment:
      "This coffee table is exactly what I was looking for. The craftsmanship is incredible and it fits perfectly in my living room. Worth every penny!",
    createdAt: "2024-05-28",
    helpful: 12,
  },
  {
    id: "review_4",
    productId: "6",
    userId: "user_1",
    userName: "Sarah Chen",
    rating: 5,
    comment:
      "Beautiful leather work! The wallet is well-made and the stitching is perfect. Great attention to detail.",
    createdAt: "2024-06-01",
    helpful: 6,
  },
];

// Helper functions
export const getUserById = (userId: string): DemoUser | undefined => {
  return demoUsers.find((user) => user.id === userId);
};

export const getUserByArtistId = (
  artistId: number | string,
): DemoUser | undefined => {
  return demoUsers.find((user) => user.artistId === artistId);
};

export const getProductsByArtistId = (
  artistId: number | string,
): DemoProduct[] => {
  return demoProducts.filter((product) => product.artistId === artistId);
};

export const getReviewsForProduct = (productId: string): DemoReview[] => {
  return demoReviews.filter((review) => review.productId === productId);
};

export const canUserReviewProduct = (
  userId: string,
  productId: string,
): boolean => {
  const product = demoProducts.find((p) => p.id === productId);
  const user = demoUsers.find((u) => u.id === userId);

  if (!product || !user) return false;

  // User cannot review their own product
  if (product.artistId === user.artistId) return false;

  // Check if user already reviewed this product
  const existingReview = demoReviews.find(
    (r) => r.productId === productId && r.userId === userId,
  );
  return !existingReview;
};
