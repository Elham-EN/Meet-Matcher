import { PrismaClient } from "@prisma/client";

/**
 * Because of hot module reloading - while devloping our app and it will not clean
 * anonther instance of Prisma client and could end up with multiple prisma client
 * instances. And here we addressed that issue. Here we make sure we only use one
 * instance of Prisma while in development while hot module reloading is on.
 */

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// The logging provide details log of what queires are going to Prisma
// from our application
export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

// If we are hot module reloading our app is restarting, its going to continue
// using same instance it already has rather than creating new instance
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
