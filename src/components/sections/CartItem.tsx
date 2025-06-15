// src/components/sections/CartWidget.tsx

import { Typography, Box, Stack, IconButton, Button } from "@mui/material";
import { Clear, Remove } from "@mui/icons-material";
import { demoProducts } from "@/data/demoData";
import { useCartWidget } from "../providers/CartProvider";
import { formatCurrency } from "@/lib/formatCurrency";

type CartItemProps = {
  id: string
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { decreaseCartQuantity, removeFromCart }  = useCartWidget()
  const item = demoProducts.find(p => p.id === id)
  if (item == null) return null

  return (
    <Stack key={item.id} direction="row" spacing={1}  sx={{ display: 'flex', alignItems: 'center'}}>
      <img
        src={item.images ? `url(${item.images})` : 'none'}
        alt={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <Box sx={{ mr:'auto'}}>
        <Typography>
          {item.name}{" "}
          {quantity > 1 && (
            <span style={{ fontSize: ".80rem", color: "grey"}}>
              x{quantity}
            </span>
          )}
        </Typography>
        <Typography sx={{ fontSize: ".80rem", color: "grey"}}>
          {formatCurrency(item.price)}
        </Typography>
      </Box>
      <Typography> {formatCurrency(item.price * quantity)}</Typography>
        <IconButton size="large" onClick={() => decreaseCartQuantity(item.id)} disabled={quantity <= 1}>
            <Remove />
        </IconButton>

        <Button variant="contained" size="medium" color="primary" onClick={() => removeFromCart(item.id)}>
            <Clear />
        </Button>
    </Stack>
  )
}