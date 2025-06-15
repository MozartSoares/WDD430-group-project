import { dbConnect } from "@/lib/mongodb";
import { UserController } from "@/server/controllers";

// GET /api/user - lists all
export async function GET() {
  await dbConnect();
  return await UserController.getAll();
}
