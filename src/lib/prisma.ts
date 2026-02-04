/**
 * Prisma Client Singleton
 * 
 * Provides a singleton instance of PrismaClient with PostgreSQL adapter.
 * Prevents multiple instances in development and ensures proper connection pooling.
 * 
 * @module lib/prisma
 */

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
    // eslint-disable-next-line no-var
    var pool: Pool | undefined;
}

// Create or reuse PostgreSQL pool
if (!global.pool) {
    global.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });
}

// Create adapter
const adapter = new PrismaPg(global.pool);

// Export Prisma client singleton
export const prisma = global.prisma ?? new PrismaClient({ adapter });

// Prevent multiple instances in development
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
