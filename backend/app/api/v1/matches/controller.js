import { prisma } from "../../../database.js";
import { MatchSchema } from "./model.js";

export const myMatchesSent = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id: userEmisorId } = decoded;

  try {
    const result = await prisma.match.findMany({
      where: {
        userEmisorId,
      },
      include: {
        userReceptor: true,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const myMatchesReceived = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id: userReceptorId } = decoded;

  try {
    const result = await prisma.match.findMany({
      where: {
        userReceptorId,
      },
      include: {
        userEmisor: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const add = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id: userEmisorId } = decoded;

  try {
    const aux = { ...body, userEmisorId };
    console.log(aux);
    const { success, data, error } = await MatchSchema.safeParseAsync(aux);

    if (!success) {
      return next({
        message: "Validation error - type" + error.errors[0].message,
        status: 400,
        error,
      });
    }

    // Reviso si existe un registro de match con los mismos usuarios
    const match = await prisma.match.findFirst({
      where: {
        OR: [
          {
            userEmisorId,
            userReceptorId: data.userReceptorId,
          },
          {
            userEmisorId: data.userReceptorId,
            userReceptorId: userEmisorId,
          },
        ],
      },
    });

    if (match) {
      return next({
        message: "Match already exists",
        status: 400,
      });
    }

    const result = await prisma.match.create({
      data: {
        ...data,
        messages: {
          create: {
            text: data.initialMessage,
            userId: userEmisorId,
          },
        },
      },
    });

    res.status(201);
    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const match = await prisma.match.findUnique({
      where: {
        id,
      },
      include: {
        userEmisor: true,
        userReceptor: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!match) {
      return next({
        message: "Match not found",
        status: 404,
      });
    }

    req.data = match;
    next();
  } catch (error) {
    next(error);
  }
};
export const read = (req, res, next) => {
  res.json({
    data: req.data,
  });
};
export const update = async (req, res, next) => {
  const { body = {}, params = {} } = req;
  const { id } = params;
  console.log(body);
  console.log(id);
  try {
    const { success, data, error } = await MatchSchema.partial().safeParseAsync(
      body
    );

    if (!success) {
      return next({
        message: "Validation error - type" + error.errors[0].message,
        status: 400,
        error,
      });
    }

    const result = await prisma.match.update({
      where: {
        id,
      },
      data,
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const remove = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    await prisma.match.delete({
      where: {
        id,
      },
    });

    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};

export const myMatchesAccepted = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id } = decoded;

  try {
    const result = await prisma.match.findMany({
      where: {
        OR: [
          {
            userEmisorId: id,
            status: true,
          },
          {
            userReceptorId: id,
            status: true,
          },
        ],
      },
      include: {
        userEmisor: true,
        userReceptor: true,
        messages: {
          orderBy: {
            createdAt: "desc",
          },

          take: 1,
        },
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
