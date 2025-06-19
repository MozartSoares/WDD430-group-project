import { dbConnect } from "@/lib/mongodb";
import { UserController } from "@/server/controllers";
import type { NextRequest } from "next/server";

// GET /api/users/email/[email] - get user by email
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  await dbConnect();
  const { email } = await params;
  return await UserController.getByEmail(email);
}

// PUT /api/users/email/[email] - update user by email
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const { email } = await params;
  const body = await req.json();
  return await UserController.update(email, body);
}

// DELETE /api/users/email/[email] - delete user by email
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  await dbConnect();
  const { email } = await params;
  return await UserController.delete(email);
}
