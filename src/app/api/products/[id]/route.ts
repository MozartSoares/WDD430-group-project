import { dbConnect } from "@/lib/mongodb";
import { ProductsController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/products/ - get product by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;
  return await ProductsController.getById(id);
}

// PUT /api/products/[id] - update product by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  return await ProductsController.update(id, body);
}

// DELETE /api/products/[id] - delete product by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;
  return await ProductsController.delete(id);
}
