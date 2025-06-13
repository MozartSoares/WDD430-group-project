import { z } from "zod";

export function ValidateBody<T extends z.ZodTypeAny>(schema: T) {
  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value!;

    descriptor.value = async function (...args: unknown[]) {
      const bodyIndex = args.length > 1 ? 1 : 0;
      const body = args[bodyIndex];
      const result = schema.safeParse(body);

      if (!result.success) {
        throw new Error(result.error.errors.map((e) => e.message).join(", "));
      }

      args[bodyIndex] = result.data;

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

export function ValidateId(
  target: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: unknown[]) {
    const id = args[0];
    const idSchema = z.string().min(1, "ID is required");

    const result = idSchema.safeParse(id);
    if (!result.success) {
      throw new Error(result.error.errors.map((e) => e.message).join(", "));
    }

    return await originalMethod.apply(this, args);
  };

  return descriptor;
}

export const handleControllerError = (error: unknown) => {
  if (error instanceof Error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 400 },
    );
  }

  return Response.json(
    {
      success: false,
      message: "Internal server error",
    },
    { status: 500 },
  );
};
