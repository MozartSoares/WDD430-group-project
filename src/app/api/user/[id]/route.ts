import { dbConnect } from "@/lib/mongodb";
import { UserController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/users/[id] - get user by id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await UserController.getById(id);
}

// PUT /api/users/[id] - update user by id
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();
  return await UserController.update(id, body);
}

// DELETE /api/users/[id] - delete user by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  return await UserController.delete(id);
}
