import { z } from 'zod';

export const validateBody = <T extends z.ZodTypeAny>(schema: T, body: unknown): z.infer<T> => {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new Error(result.error.errors.map((e) => e.message).join(', '));
  }
  return result.data as z.infer<T>;
};

export const handleControllerError = (error: unknown) => {
  if (error instanceof Error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 }
    );
  }

  return Response.json(
    {
      success: false,
      message: 'Internal server error',
    },
    { status: 500 }
  );
};
