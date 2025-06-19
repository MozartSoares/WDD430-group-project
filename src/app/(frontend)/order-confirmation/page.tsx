// src/app/(frontend)/order-confirmation/page.tsx

"use client";

import { Header, Footer } from "@/components";
import { useSession } from "next-auth/react";
import { useCartWidget } from "@/components/providers/CartProvider";
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[];
}

export default function OrderConfirmationPage() {
  const { data: session } = useSession();
  const { cartItems } = useCartWidget();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productPromises = cartItems.map((item) =>
          fetch(/api/products/${item.id}).then((res) => res.json())
        );
        const results = await Promise.all(productPromises);
        setProducts(results);
      } catch (error) {
        console.error("Error loading products", error);
      } finally {
        setLoading(false);
        
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [cartItems]);

  const getProduct = (id: string) => products.find((p) => p.id === id);
  const calculateTotal = () =>
    cartItems.reduce((total, item) => {
      const product = getProduct(item.id);
      return total + (product?.price ?? 0) * item.quantity;
    }, 0);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!session?.user) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h5">Please log in to view your order.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header cartItemCount={0} onCartClick={() => {}} />

      <Container maxWidth="md" sx={{ py: 5, flexGrow: 1 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" gutterBottom>
            Order Confirmation
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            Your request has been sent to the artisan. They will contact you.
          </Typography>

          <Typography variant="h6" sx={{ mb: 1 }}>
            Your Information:
          </Typography>
          <Typography>Name: {session.user.name}</Typography>
          <Typography>Email: {session.user.email}</Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary:
          </Typography>
          <List>
            {cartItems.map((item) => {
              const product = getProduct(item.id);
              if (!product) return null;

              return (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={${product.name} × ${item.quantity}}
                    secondary={$${product.price.toFixed(2)} each}
                  />
                  <Typography>
                    ${ (product.price * item.quantity).toFixed(2) }
                  </Typography>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Total: ${calculateTotal().toFixed(2)}
          </Typography>
        </Paper>
      </Container>

      <Footer onContactClick={() => {}} onLinkClick={() => {}} />
    </Box>
  );
}