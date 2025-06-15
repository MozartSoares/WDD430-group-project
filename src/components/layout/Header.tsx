// src/components/layout/Header.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Menu as MenuIcon,
  Close,
  Person,
  Logout,
  ShoppingBag,
  Home,
  Category,
  Info,
  Phone,
} from '@mui/icons-material';
import { useCartWidget } from '../providers/CartProvider';

interface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onCartClick?: () => void;
}

export default function Header({ 
  cartItemCount = 0, 
  onCartClick 
}: HeaderProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {openCart, cartQuantity}  = useCartWidget()

  const isLoggedIn = !!session;

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setUserMenuAnchor(null);
    router.push('/');
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  // Add this function to handle profile navigation
  const handleProfileClick = () => {
    setUserMenuAnchor(null);
    router.push('/profile');
  };

  const handleCartClick = () => {
    if (onCartClick) {
      onCartClick();
    } else {
      // Demo cart page - you can create this later
      console.log('Navigate to cart');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigationItems = [
    { label: 'Home', href: '/', icon: <Home /> },
    { label: 'All Products', href: '/products', icon: <ShoppingBag /> },
    { label: 'Categories', href: '/categories', icon: <Category /> },
    { label: 'About', href: '/about', icon: <Info /> },
    { label: 'Contact', href: '/contact', icon: <Phone /> },
  ];

  const handleNavClick = (href: string) => {
    // For demo purposes, only certain routes exist
    if (href === '/products') {
      router.push('/products');
    } else if (href === '/') {
      router.push('/');
    } else {
      // For non-existent routes, just close menu and log
      console.log(`Navigate to: ${href}`);
      setMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{ 
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          {/* Mobile Menu Button */}
          <IconButton
            edge="start"
            onClick={toggleMobileMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            onClick={() => router.push('/')}
            sx={{
              fontFamily: 'var(--font-roboto-slab)',
              fontWeight: 600,
              color: 'primary.main',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            Handcrafted Haven
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 4 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                sx={{ color: 'text.primary' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              maxWidth: 300,
              flexGrow: 1,
            }}
          >
            <TextField
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'background.default',
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" size="small">
                    <Search />
                  </IconButton>
                ),
              }}
              fullWidth
            />
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Mobile Search */}
            <IconButton sx={{ display: { xs: 'block', sm: 'none' } }}>
              <Search />
            </IconButton>

            {/* Cart */}
            <IconButton onClick={openCart}>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Login/User Menu */}
            {isLoggedIn ? (
              <>
                <IconButton onClick={handleUserMenuClick}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {session?.user?.name?.[0] || 'U'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      {session?.user?.email}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleProfileClick}>
                    <ListItemIcon>
                      <Person />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleUserMenuClose}>
                    <ListItemIcon>
                      <ShoppingBag />
                    </ListItemIcon>
                    My Orders
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={handleLoginClick}
                startIcon={<Person />}
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            Menu
          </Typography>
          <IconButton onClick={toggleMobileMenu}>
            <Close />
          </IconButton>
        </Box>
        <Divider />

        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.label}
              onClick={() => {
                handleNavClick(item.href);
                setMobileMenuOpen(false);
              }}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Mobile Login/User Section */}
        <Box sx={{ p: 2 }}>
          {isLoggedIn ? (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Signed in as:
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {session?.user?.email}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  handleProfileClick();
                  setMobileMenuOpen(false);
                }}
                startIcon={<Person />}
                fullWidth
                sx={{ mb: 1 }}
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                onClick={handleLogout}
                startIcon={<Logout />}
                fullWidth
                sx={{ mt: 1 }}
              >
                Sign Out
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              onClick={() => {
                handleLoginClick();
                setMobileMenuOpen(false);
              }}
              startIcon={<Person />}
              fullWidth
            >
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Search */}
        <Box sx={{ p: 2 }}>
          <Box component="form" onSubmit={handleSearch}>
            <TextField
              size="small"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton type="submit" size="small">
                    <Search />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}