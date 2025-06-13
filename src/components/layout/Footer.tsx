// src/components/layout/Footer.tsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Button,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Instagram,
  Facebook,
  YouTube,
  Twitter,
  Email,
} from '@mui/icons-material';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  onContactClick?: () => void;
  onLinkClick?: (href: string) => void;
}

const footerSections: FooterSection[] = [
  {
    title: 'Need help?',
    links: [
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Customer Support',
    links: [
      { label: 'Returns & Warranty', href: '/returns' },
      { label: 'Payments', href: '/payments' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Corporate Info',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Brands', href: '/brands' },
      { label: 'Cookies', href: '/cookies' },
    ],
  },
  {
    title: 'Gift Card',
    links: [
      { label: 'Buy Gift Cards', href: '/gift-cards' },
      { label: 'Redeem Card', href: '/redeem' },
    ],
  },
];

export default function Footer({ onContactClick, onLinkClick }: FooterProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLinkClick = (href: string) => {
    if (onLinkClick) {
      onLinkClick(href);
    }
  };

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        pt: 6,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                {section.title}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.links.map((link, linkIndex) => {
                  // Special handling for Contact Us button
                  if (link.label === 'Contact Us') {
                    return (
                      <Button
                        key={linkIndex}
                        variant="contained"
                        onClick={handleContactClick}
                        sx={{
                          backgroundColor: 'text.primary',
                          color: 'background.paper',
                          alignSelf: 'flex-start',
                          px: 3,
                          py: 1,
                          '&:hover': {
                            backgroundColor: 'text.secondary',
                          },
                        }}
                      >
                        {link.label}
                      </Button>
                    );
                  }
                  
                  return (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'center' },
            gap: 2,
          }}
        >
          {/* Logo/Company Name */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Handcrafted Haven
          </Typography>

          {/* Social Media Icons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'primary.main',
                  '& svg': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Instagram />
            </IconButton>
            
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'primary.main',
                  '& svg': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Facebook />
            </IconButton>
            
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'primary.main',
                  '& svg': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <YouTube />
            </IconButton>
            
            <IconButton
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'primary.main',
                  '& svg': {
                    color: 'primary.contrastText',
                  },
                },
              }}
            >
              <Twitter />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: { xs: 'center', md: 'right' } }}
          >
            © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}