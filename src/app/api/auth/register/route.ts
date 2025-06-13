import { ProductsController } from "@/server";
import dbConnect from "@/lib/mongodb";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  return await ProductsController.create(req);
}
