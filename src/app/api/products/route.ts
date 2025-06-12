import dbConnect from '@/lib/mongodb';
import { ProductsController } from '@/server';
import type { NextRequest } from 'next/server';

//create product
export async function POST(req: NextRequest) {
  await dbConnect();
  return await ProductsController.create(req);
}

// export async function GET(req: NextRequest) {
//   await dbConnect();
//   return await ProductsController.get(req);
// }
