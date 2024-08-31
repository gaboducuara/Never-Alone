import { z } from "zod";

export const fields = [
    "id",
    "messages",
    "usuarioA",
    "userAId",
    "usuarioB",
    "userBId",
    "createdAt",
    "updatedAt",
    "status",
];

export const ConversationSearchSchema = z.object({
    id: z.string().uuid(),
});

export const ConversationCreateSchema = z.object({
    usuarioAId: z.string().uuid(),
    usuarioBId: z.string().uuid(),
});