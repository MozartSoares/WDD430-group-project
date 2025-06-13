import { UserController } from '@/server/controllers';
import dbConnect from '@/lib/mongodb';

// GET /api/user - lists all
export async function GET() {
  await dbConnect();
  return await UserController.getAll();
}
