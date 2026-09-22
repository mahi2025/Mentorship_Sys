import { AppError } from "../errors/AppError";

export function parsePositiveInt(
  value: string | string[] | undefined,
  name: string,
): number {
  if (Array.isArray(value)) {
    throw new AppError(`Invalid ${name}`, 400);
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new AppError(`Invalid ${name}`, 400);
  }

  return parsed;
}