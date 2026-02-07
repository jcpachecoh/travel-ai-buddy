import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  // Create connection pool if it doesn't exist
  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  
  const adapter = new PrismaPg(globalForPrisma.pool);
  return new PrismaClient({ adapter });
}

function getPrisma() {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    const client = getPrisma();
    const value = client[prop as keyof PrismaClient];
    // Bind methods to the client to preserve 'this' context
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  }
});

