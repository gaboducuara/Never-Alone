import { PrismaClient } from '@prisma/client';
import { z } from "zod";

const prisma = new PrismaClient();

const messageSchema = z.object({
  text: z.string().min(1).max(280),
  userId: z.string().uuid(),
  conversationId: z.string().uuid(),
});

export { prisma, messageSchema };
