/**
 * Prisma Configuration for Prisma 7
 * 
 * This file configures Prisma for the application.
 * The database URL is loaded from the DATABASE_URL environment variable.
 * 
 * @see https://www.prisma.io/docs/orm/prisma-schema
 */

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
