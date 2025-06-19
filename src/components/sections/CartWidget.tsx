// src/components/sections/CartWidget.tsx
"use client";

import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/formatCurrency";
import type { IProduct } from "@/types";
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCartWidget } from "../providers/CartProvider";
import { CartItem } from "./CartItem";

export default function CartWidget() {
  const { isOpen, closeCart, cartQuantity, cartItems, resetCart } =
    useCartWidget();
  const { getProducts } = useProducts();
  const [products, setProducts] = useState<IProduct[]>([]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchProducts = async () => {
      const productsResponse = await getProducts();
      if (productsResponse.success && productsResponse.products) {
        setProducts(productsResponse.products);
      }
    };
    fetchProducts();
  }, []);
  return (
    <Drawer
      open={isOpen}
      anchor={"right"}
      onClose={closeCart}
      PaperProps={{ sx: { width: { xs: "75%", sm: 500 }, padding: 2 } }}
    >
      <Typography variant="h4">Your Cart</Typography>

      <Box sx={{ p: { xs: 1, md: 3 } }}>
        {cartQuantity === 0 ? (
          <Typography>No items in your cart.</Typography>
        ) : (
          <Stack spacing={3}>
            {cartItems.map((item) => (
              <CartItem
                key={item?._id?.toString()}
                {...item}
                id={item?._id?.toString()}
              />
            ))}
            <Typography variant="h5" align="right">
              Total:
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = products.find(
                    (i) => i._id.toString() === cartItem?._id?.toString(),
                  );
                  return (
                    total + (item?.currentPrice ?? 0) * (cartItem.quantity ?? 0)
                  );
                }, 0),
              )}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={resetCart}
              sx={{ flexGrow: 1, py: 1.5 }}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}
