import dbConnect from '@/lib/mongodb';
import { UserController } from '@/server/controllers';
import { NextRequest } from 'next/server';

// GET /api/users/[id] - get product by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  return await UserController.getById(id);
}

// PUT /api/users/[id] - update product by id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  const body = await req.json();
  return await UserController.update(id, body);
}

// DELETE /api/users/[id] - delete product by id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;
  return await UserController.delete(id);
}
