import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// To prevent multiple instantiations while hot-reloading in dev
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  const globalObj = global as any;
  if (!globalObj.prisma) {
    globalObj.prisma = new PrismaClient();
  }
  prisma = globalObj.prisma;
}

export default prisma;
