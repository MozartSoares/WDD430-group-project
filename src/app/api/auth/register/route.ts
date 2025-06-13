import dbConnect from "@/lib/mongodb";
import { AuthController } from "@/server";
import type { NextRequest } from "next/server";


// POST /api/auth/register - register a user
export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  return await AuthController.register(body);
}
