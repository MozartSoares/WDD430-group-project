import { ProductsController } from '@/server';
import dbConnect from '@/lib/mongodb';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  await dbConnect();
  return await ProductsController.create(req);
}
