
## FE Structure
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── CategoryGrid.tsx
│       └── ProductGrid.tsx
├── lib/
│   └── theme.ts
├── types/
│   └── index.ts
└── app/
    └── (frontend)/
        └── page.tsx

## Usage Examples
Basic Homepage Implementation
tsximport React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import CategoryGrid from '@/components/sections/CategoryGrid';
import ProductGrid from '@/components/sections/ProductGrid';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header cartItemCount={3} isLoggedIn={false} />
      <HeroSection 
        title="Your Custom Title"
        subtitle="Your custom subtitle here"
      />
      <CategoryGrid categories={yourCategories} />
      <ProductGrid products={yourProducts} />
      <Footer />
    </>
  );
}

## Individual Component Usage
### Header Component
tsx<Header
  cartItemCount={5}
  isLoggedIn={true}
  onLoginClick={() => console.log('Login clicked')}
  onCartClick={() => console.log('Cart clicked')}
/>
### Hero Section
tsx<HeroSection
  title="Discover Unique Handcrafted Treasures"
  subtitle="Connect with talented artisans..."
  backgroundColor="#E5E7EB"
/>
### Category Grid
tsx<CategoryGrid
  title="Shop by Category"
  categories={categories}
  onCategoryClick={(category) => router.push(`/category/${category.id}`)}
  showBackButton={false}
/>
### Product Grid
tsx<ProductGrid
  products={products}
  totalProducts={100}
  currentPage={1}
  onPageChange={(page) => setCurrentPage(page)}
  onProductClick={(product) => router.push(`/product/${product.id}`)}
  onSortChange={(sort) => setSortBy(sort)}
  showFilters={true}
/>
## Key Features
### Responsive Design

All components are fully responsive
Mobile-first approach with breakpoints
Collapsible mobile navigation
Adaptive grid layouts

### Customizable Theme

Steel Blue (#4F7CAC) primary color
Redwood (#A63D40) accent color
Roboto + Roboto Slab typography
Consistent spacing and shadows

### Interactive Components

Hover effects on cards and buttons
Loading states and animations
Search functionality
Filter and sort options
Pagination

### Accessibility

Semantic HTML structure
ARIA labels and roles
Keyboard navigation support
Screen reader friendly
High contrast ratios

## Component Props
### Header Props
tsxinterface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onCartClick?: () => void;
}

### Hero Section Props
tsxinterface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

### Category Grid Props
tsxinterface CategoryGridProps {
  title?: string;
  categories?: Category[];
  onCategoryClick?: (category: Category) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

### Product Grid Props
tsxinterface ProductGridProps {
  products?: Product[];
  totalProducts?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onProductClick?: (product: Product) => void;
  onSortChange?: (sortBy: string) => void;
  onFilterClick?: () => void;
  showFilters?: boolean;
}