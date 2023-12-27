import "dotenv/config";
import { DataSource } from "typeorm";
import { appEnvs } from "../../app/envs";
import { postgresEnvs } from "../../app/envs/postgres.env";

const isProduction = appEnvs.ambiente === "production";
const isTest = appEnvs.ambiente?.toLocaleLowerCase() === "test";
const rootDir = isProduction ? "dist" : "src";

export default new DataSource({
  type: "postgres",
  url: isTest ? postgresEnvs.urlTest : postgresEnvs.url,
  entities: [rootDir + "/app/shared/database/entities/**/*"],
  migrations: [rootDir + "/app/shared/database/migrations/**/*"],
  synchronize: false,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
});
