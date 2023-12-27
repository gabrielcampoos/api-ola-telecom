import { Redis } from "ioredis";
import { appEnvs } from "../../app/envs";

export const redis = new Redis(appEnvs.redisUrl);
