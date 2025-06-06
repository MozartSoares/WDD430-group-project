'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Search,
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Close,
} from '@mui/icons-material';

interface HeaderProps {
  cartItemCount?: number;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onCartClick?: () => void;
}

const menuItems = ['MENU', 'MENU', 'MENU', 'MENU'];

export default function Header({ 
  cartItemCount = 0, 
  isLoggedIn = false,
  onLoginClick,
  onCartClick 
}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle search functionality
    console.log('Search:', searchValue);
  };

  const MobileMenu = (
    <Drawer
      anchor="right"
      open={mobileMenuOpen}
      onClose={handleMobileMenuToggle}
      sx={{ '& .MuiDrawer-paper': { width: 250, pt: 2 } }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, pb: 2 }}>
        <IconButton onClick={handleMobileMenuToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
        <ListItem>
          <Button
            variant="outlined"
            startIcon={<Person />}
            fullWidth
            onClick={onLoginClick}
          >
            {isLoggedIn ? 'Account' : 'Login'}
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        color="inherit" 
        elevation={1}
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Handcrafted Haven
          </Typography>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          <Box 
            component="form" 
            onSubmit={handleSearchSubmit}
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              flexGrow: 1,
              maxWidth: 400,
              mx: 2 
            }}
          >
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                },
              }}
            />
          </Box>

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Desktop Login Button */}
            {!isMobile && (
              <Button
                variant="outlined"
                startIcon={<Person />}
                onClick={onLoginClick}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                  },
                }}
              >
                {isLoggedIn ? 'Account' : 'Login'}
              </Button>
            )}

            {/* Cart */}
            <IconButton 
              onClick={onCartClick}
              sx={{ 
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                }
              }}
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton 
                onClick={handleMobileMenuToggle}
                sx={{ color: 'primary.main' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Search Bar */}
        {isMobile && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Box component="form" onSubmit={handleSearchSubmit}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        )}
      </AppBar>

      {/* Mobile Menu Drawer */}
      {MobileMenu}
    </>
  );
}