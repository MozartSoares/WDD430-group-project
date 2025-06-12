import { AuthController } from "@/server";
import dbConnect from "@/lib/mongodb";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await dbConnect();
  return await AuthController.login(req);
}
