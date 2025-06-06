// src/components/sections/HeroSection.tsx
'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
}

export default function HeroSection({
  title = "Tagline describing Handcrafted Haven",
  subtitle = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
  backgroundColor = "#E5E7EB" // Light gray default
}: HeroSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{
        backgroundColor: backgroundColor,
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            px: 2,
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
          
          <Typography
            variant={isMobile ? 'body1' : 'h6'}
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Container>
      
      {/* Optional decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: 'linear-gradient(45deg, transparent 30%, rgba(79, 124, 172, 0.1) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}