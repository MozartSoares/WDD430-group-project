import { dbConnect } from "@/lib/mongodb";
import { ProductsController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/products/user/[id] - get product by user id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await ProductsController.getByUserId(id);
}
