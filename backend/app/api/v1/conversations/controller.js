import { prisma } from "../../../database.js";
import { ConversationSearchSchema, ConversationCreateSchema } from "./model.js";

export const id = async (req, res, next) => {
    const id = req.params.id;
    try {
        const { success, data, error } = await ConversationSearchSchema.safeParseAsync({ id })
        if (!success) {
            return next({
                message: "Validation error - type" + error.errors[0].message,
                status: 400,
                error
            })
        }

        const result = await prisma.conversation.findUnique({
            where: {
                id: id,
            },
        });

        if (result === null) {
            next({ message: "Conversation not found", status: 404 });
        } else {
            res.status(201).json({ data: result });
        }

    } catch (error) {
        next(error);
    }
}

export const create = async (req, res, next) => {
    const { usuarioAId, usuarioBId } = req.body;

    try {
        const { success, data, error } = await ConversationCreateSchema.safeParseAsync({ usuarioAId, usuarioBId })
        if (!success) {
            return next({
                message: "Validation error - type" + error.errors[0].message,
                status: 400,
                error
            })
        }

        const userA = await prisma.user.findUnique({
            where: { id: usuarioAId },
        });

        const userB = await prisma.user.findUnique({
            where: { id: usuarioBId },
        });

        if (!userA || !userB) {
            return next({ message: "One or both users do not exist", status: 404 });
        }

        const newConversation = await prisma.conversation.create({
            data: {
                userAId: usuarioAId,
                userBId: usuarioBId,
            },
        });

        res.status(201).json({ data: newConversation });
    } catch (error) {
        next(error);
    }
};

export const read = async (req, res, next) => {
    try {
        const conversations = await prisma.conversation.findMany();
        res.json({ data: conversations });
    } catch (error) {
        next(error);
    }
};

export const archive = async (req, res, next) => {
    const id = req.params.id;
    try {
        const { success, data, error } = await ConversationSearchSchema.safeParseAsync({ id })
        if (!success) {
            return next({
                message: "Validation error - type" + error.errors[0].message,
                status: 400,
                error
            })
        }

        const conversation = await prisma.conversation.update({
            where: {
                id: id,
            },
            data: {
                status: false,
            },
        });

        res.status(200).json({ message: "Conversation deactivated successfully", data: conversation });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    const id = req.params.id;
    try {
        const { success, data, error } = await ConversationSearchSchema.safeParseAsync({ id })
        if (!success) {
            return next({
                message: "Validation error - type" + error.errors[0].message,
                status: 400,
                error
            })
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: id,
            },
        });

        if (!conversation) {
            return next({ message: "Conversation not found", status: 404 });
        }

        await prisma.conversation.delete({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        next(error);
    }
};