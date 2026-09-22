import { sql } from "kysely";
import type { Request, Response } from "express";
import { db } from "../../config/database";
import redisClient from "../../config/redis";

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
};

export async function readinessCheck(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    await sql`SELECT 1`.execute(db);

    if (!redisClient.isReady) {
      throw new Error("Redis is not ready");
    }

    await redisClient.ping();

    res.status(200).json({
      success: true,
      status: "ready",
      dependencies: {
        database: "ok",
        redis: "ok",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Readiness check failed", error);

    res.status(503).json({
      success: false,
      status: "not_ready",
      dependencies: {
        database: "unknown",
        redis: "unknown",
      },
      timestamp: new Date().toISOString(),
    });
  }
}


