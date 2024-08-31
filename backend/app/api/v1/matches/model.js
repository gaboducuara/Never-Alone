import { z } from "zod";

export const MatchSchema = z.object({
  initialMessage: z.string().optional(),
  userEmisorId: z.string().uuid(),
  userReceptorId: z.string().uuid(),
  status: z.boolean().optional(),
});
