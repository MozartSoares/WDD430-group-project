// src/components/sections/CartWidget.tsx
'use client';

import { Drawer, Typography, Box, Stack, Button } from "@mui/material";
import { useCartWidget } from "../providers/CartProvider";
import { useEffect, useState } from "react";
import { CartItem } from "./CartItem";
import { formatCurrency } from "@/lib/formatCurrency";
import { useRouter } from "next/navigation";


export default function CartWidget(){
  const router = useRouter();
  const { isOpen, closeCart, cartQuantity, cartItems, resetCart }  = useCartWidget()
  const [realProducts, setRealProducts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCartProducts() {
      const entries = await Promise.all(
        cartItems.map(async ({ id }) => {
          try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            return [id, data.price] as [string, number];
          } catch {
            return [id, 0];
          }
        })
      );
      setRealProducts(Object.fromEntries(entries));
    }

    if (cartItems.length > 0) {
      fetchCartProducts();
    }
  }, [cartItems]);

    return (
        <Drawer open={isOpen} anchor={'right'} onClose={closeCart} PaperProps={{ sx: { width: { xs: "75%", sm: 500 }, padding: 2, }}}> 
            <Typography variant="h4">
                Your Cart
            </Typography>

            <Box sx={{ p: { xs:1, md:3}}}>
                {cartQuantity === 0 ? <Typography>No items in your cart.</Typography> :
                    <Stack spacing={3}>
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}
                        <Typography variant="h5" align="right">
                        Total:{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const price = realProducts[cartItem.id] ?? 0;
                                return total + price * cartItem.quantity;
                              }, 0)
                              
                        )}
                        </Typography>
                        <Button
                        variant="contained"
                        size="large"
                        onClick={() => router.push("/order-confirmation")}
                        sx={{ flexGrow: 1, py: 1.5 }}
                        >
                        Proceed to Checkout
                        </Button>
                    </Stack>
                }
            </Box>
        </Drawer>
    )
};
