"use client";
import type { ICategory } from "@/types";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

interface CategoryGridProps {
  title?: string;
  categories?: ICategory[];
  loading?: boolean;
  onCategoryClick?: (category: ICategory) => void;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

export const CategoryGrid = ({
  title = "Category Name",
  loading = true,
  categories = [],
  onCategoryClick,
  onBackClick,
  showBackButton = true,
}: CategoryGridProps) => {
  const theme = useTheme();

  const handleCategoryClick = (category: ICategory) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        {showBackButton && (
          <Button
            startIcon={<ArrowBack />}
            onClick={onBackClick}
            sx={{
              color: "text.secondary",
              mb: 2,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "primary.contrastText",
              },
            }}
          >
            All Products
          </Button>
        )}

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 3,
          }}
        >
          {title}
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={3}>
        {loading ? (
          <CircularProgress />
        ) : (
          categories?.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id.toString()}>
              <Card
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
                onClick={() => handleCategoryClick(category)}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: "#F3F4F6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: category.imageUrl
                      ? `url(${category.imageUrl})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!category.imageUrl && (
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: "primary.main",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          color: "primary.contrastText",
                          fontWeight: "bold",
                        }}
                      >
                        {category.name.charAt(0)}
                      </Typography>
                    </Box>
                  )}
                </CardMedia>

                <CardContent sx={{ textAlign: "center", py: 2 }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};
