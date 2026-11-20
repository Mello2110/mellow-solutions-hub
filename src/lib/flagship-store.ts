import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { INITIAL_PROJECTS } from "@/data/projects";
import defaultFlagshipIds from "@/data/flagship.json";

const FLAGSHIP_REDIS_KEY = "mellow:flagship:ids";
const LOCAL_FLAGSHIP_PATH = path.join(process.cwd(), "src", "data", "flagship.json");

const FlagshipIdsSchema = z.array(z.string().min(1));

const VALID_PROJECT_IDS = new Set(INITIAL_PROJECTS.map((p) => p.id));

function getDefaultFlagshipIds(): string[] {
  const fromJson = FlagshipIdsSchema.safeParse(defaultFlagshipIds);
  if (fromJson.success) {
    return sanitizeIds(fromJson.data);
  }
  return INITIAL_PROJECTS.filter((p) => p.featured).map((p) => p.id);
}

function sanitizeIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const id of ids) {
    if (VALID_PROJECT_IDS.has(id) && !seen.has(id)) {
      seen.add(id);
      result.push(id);
    }
  }
  return result;
}

function createRedisClient(): Redis | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return new Redis({ url, token });
}

let _redis: Redis | null | undefined;
function getRedis(): Redis | null {
  if (_redis === undefined) {
    _redis = createRedisClient();
  }
  return _redis;
}

export function isPersistentStoreConfigured(): boolean {
  return getRedis() !== null;
}

/**
 * Reads the ordered list of flagship project IDs.
 * Uses Upstash Redis in production when configured, falling back to local flagship.json in development.
 */
export async function getFlagshipIds(): Promise<string[]> {
  const redis = getRedis();

  if (redis) {
    try {
      const stored = await redis.get<unknown>(FLAGSHIP_REDIS_KEY);
      const parsed = FlagshipIdsSchema.safeParse(stored);
      if (parsed.success) {
        return sanitizeIds(parsed.data);
      }
      // First-time seed into Redis if key does not exist yet
      const defaults = getDefaultFlagshipIds();
      await redis.set(FLAGSHIP_REDIS_KEY, defaults);
      return defaults;
    } catch (error) {
      console.error("[flagship-store] Redis read failed, using defaults:", error);
      return getDefaultFlagshipIds();
    }
  }

  // Local file fallback (development)
  try {
    const raw = await fs.readFile(LOCAL_FLAGSHIP_PATH, "utf-8");
    const parsed = FlagshipIdsSchema.safeParse(JSON.parse(raw));
    if (parsed.success) {
      return sanitizeIds(parsed.data);
    }
  } catch {
    // Ignore read errors and fall back to bundled defaults
  }

  return getDefaultFlagshipIds();
}

/**
 * Persists the ordered list of flagship project IDs.
 */
export async function saveFlagshipIds(ids: string[]): Promise<string[]> {
  const cleanIds = sanitizeIds(ids);
  const redis = getRedis();

  if (redis) {
    await redis.set(FLAGSHIP_REDIS_KEY, cleanIds);
    return cleanIds;
  }

  // In production without Redis, writing to the local filesystem will fail or not persist across instances.
  if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    throw new Error(
      "Upstash Redis is not configured. Connect Upstash Redis (UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN) to persist Flagship changes in production."
    );
  }

  await fs.writeFile(
    LOCAL_FLAGSHIP_PATH,
    `${JSON.stringify(cleanIds, null, 2)}\n`,
    "utf-8"
  );
  return cleanIds;
}

/**
 * Adds or removes a single project ID from the flagship list.
 */
export async function setProjectFlagship(
  projectId: string,
  featured: boolean
): Promise<string[]> {
  if (!VALID_PROJECT_IDS.has(projectId)) {
    throw new Error(`Unknown project ID: ${projectId}`);
  }

  const current = await getFlagshipIds();
  const next = featured
    ? current.includes(projectId)
      ? current
      : [...current, projectId]
    : current.filter((id) => id !== projectId);

  return saveFlagshipIds(next);
}
