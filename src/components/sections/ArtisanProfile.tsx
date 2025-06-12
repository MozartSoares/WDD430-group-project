// src/components/sections/ArtisanProfile.tsx
"use client";
import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  Rating,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface ArtisanProfileProps {
  artist: {
    id: string;
    name: string;
    avatar?: string;
    bio: string;
    rating: number;
    reviewCount: number;
  };
  title?: string;
  showContainer?: boolean;
  sx?: any;
}

export default function ArtisanProfile({
  artist,
  title = "About the Artisan",
  showContainer = true,
  sx = {},
}: ArtisanProfileProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const content = (
    <Box sx={{ mb: 6, ...sx }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                src={artist.avatar}
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  mx: "auto",
                  mb: 2,
                }}
              >
                {artist.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{artist.name}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 1,
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? 0.5 : 1,
                }}
              >
                <Rating
                  value={artist.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <Typography variant="body2" sx={{ ml: isMobile ? 0 : 1 }}>
                  ({artist.reviewCount})
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              {artist.bio}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );

  if (showContainer) {
    return <Container maxWidth="lg">{content}</Container>;
  }

  return content;
}
