import { dbConnect } from "@/lib/mongodb";
import { ProductsController } from "@/server";
import type { NextRequest } from "next/server";

// GET /api/products - lists all products
export async function GET() {
  await dbConnect();
  return await ProductsController.getAll();
}

// POST /api/products - creates a product
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  return await ProductsController.create(body);
}
