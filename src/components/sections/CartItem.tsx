// src/components/sections/CartWidget.tsx

import { useProducts } from "@/hooks/useProducts";
import { formatCurrency } from "@/lib/formatCurrency";
import { Clear, Remove } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useCartWidget } from "../providers/CartProvider";

type CartItemProps = {
  id: string;
  quantity: number;
};

export async function CartItem({ id, quantity }: CartItemProps) {
  const { decreaseCartQuantity, removeFromCart } = useCartWidget();
  const { getProduct } = useProducts();
  const item = await getProduct(id);
  if (item == null) return null;

  return (
    <Stack
      key={item.id}
      direction="row"
      spacing={1}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <img
        src={item.images ?? "none"}
        alt={item.name}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <Box sx={{ mr: "auto" }}>
        <Typography>
          {item.name}{" "}
          {quantity > 1 && (
            <span style={{ fontSize: ".80rem", color: "grey" }}>
              x{quantity}
            </span>
          )}
        </Typography>
        <Typography sx={{ fontSize: ".80rem", color: "grey" }}>
          {formatCurrency(item.price)}
        </Typography>
      </Box>
      <Typography> {formatCurrency(item.price * quantity)}</Typography>
      <IconButton
        size="large"
        onClick={() => decreaseCartQuantity(item.id)}
        disabled={quantity <= 1}
      >
        <Remove />
      </IconButton>

      <Button
        variant="contained"
        size="medium"
        color="primary"
        onClick={() => removeFromCart(item.id)}
      >
        <Clear />
      </Button>
    </Stack>
  );
}
