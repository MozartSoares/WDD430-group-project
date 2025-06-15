// src/components/sections/CartWidget.tsx
'use client';

import { Drawer, Typography, Box, Stack, Button } from "@mui/material";
import { useCartWidget } from "../providers/CartProvider";
import { demoProducts } from "@/data/demoData";
import { CartItem } from "./CartItem";
import { formatCurrency } from "@/lib/formatCurrency";

export default function CartWidget(){
  const { isOpen, closeCart, cartQuantity, cartItems, resetCart }  = useCartWidget()
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
                                const item = demoProducts.find(i => i.id === cartItem.id)
                                return total + (item?.price ?? 0) * cartItem.quantity
                            }, 0)
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
                }
            </Box>
        </Drawer>
    )
};
