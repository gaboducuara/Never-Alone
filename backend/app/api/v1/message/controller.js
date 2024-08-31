import { prisma, messageSchema } from "./model.js";

async function getAllMessagesBetweenUsers(req, res) {
  const { userId1, userId2 } = req.params; // Suponiendo que userId1 y userId2 están en los parámetros de la solicitud

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            userId: userId1,
            Conversation: {
              userBId: userId2,
            },
          },
          {
            userId: userId2,
            Conversation: {
              userBId: userId1,
            },
          },
        ],
      },
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function sendMessage(req, res) {
  const { text, senderId, receiverId } = req.body; // Suponiendo que senderId y receiverId están en el cuerpo de la solicitud

  try {
    // Buscar si ya existe una conversación entre los dos usuarios
    let conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            OR: [
              { userAId: senderId, userBId: receiverId },
              { userAId: receiverId, userBId: senderId },
            ],
          },
          { status: true }, // Si la conversación está activa
        ],
      },
    });

    // Si no existe una conversación, crear una nueva
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userAId: senderId,
          userBId: receiverId,
          status: true,
        },
      });
    }

    // Ahora, agregamos el mensaje a la conversación
    const message = await prisma.message.create({
      data: {
        text,
        userId: senderId,
        conversationId: conversation.id,
      },
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllMessages(req, res) {
  try {
    const messages = await prisma.message.findMany();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export const create = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { matchId } = body;
  const { id: userId } = decoded;

  try {
    const mensaje = await prisma.message.create({
      data: {
        ...body,
        matchId,
        userId,
      },
    });

    res.json({
      data: mensaje,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllMessagesBetweenUsers, sendMessage, getAllMessages };
