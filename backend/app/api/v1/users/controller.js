import { prisma } from "../../../database.js";
import { signToken } from "../auth.js";
import fs from "fs";

import { encryptPassword, verifyPassword } from "./model.js";
import { uploadFiles } from "../../uploadsFiles/uploads.js";

export const signup = async (req, res, next) => {
  const { body = {} } = req;
  const { userData } = body;
  console.log(userData);
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 10;

    if (!emailRegex.test(userData.email)) {
      return res
        .status(400)
        .json({ error: "El correo electrónico no es válido" });
    }

    if (userData.password.length < passwordMinLength) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 10 caracteres" });
    }

    // Verifico y devuelvo errores de si existe correo o username

    const userExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: userData.email,
          },
          {
            username: userData.username,
          },
        ],
      },
    });

    if (userExists) {
      return res.status(400).json({
        error: "El correo electrónico o nombre de usuario ya está en uso",
      });
    }

    const password = await encryptPassword(userData.password);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password,
      },
    });

    user.password = undefined;

    const token = signToken({
      id: user.id,
      email: user.email,
    });

    res.status(201);
    res.json({
      user,
      meta: {
        token,
      },
    });
  } catch (error) {
    next({
      message: error.message,
      status: 400,
      error,
    });
  }
};

export const signin = async (req, res, next) => {
  const { body = {} } = req;
  const { email, password } = body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return next({
        message: "El correo electrónico no es válido",
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      return next({
        message: "Correo electrónico o contraseña incorrectos",
        status: 401,
      });
    }

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch) {
      return next({
        message: "Correo electrónico o contraseña incorrectos",
        status: 401,
      });
    }

    const token = signToken({
      id: user.id,
      email: user.email,
    });

    user.password = undefined;

    res.json({
      ...user,

      meta: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const id = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const result = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (result === null) {
      next({ message: "User not found", status: 404 });
    } else {
      req.result = result;
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const all = (req, res) => {
  res.json({
    data: [],
  });
};

export const read = async (req, res, next) => {
  const { params = {} } = req;
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        interests: true,
      },
    });

    if (!user) {
      return next({
        message: "User not found",
        status: 404,
      });
    }
    user.password = undefined;

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const update = (req, res) => {
  res.json({
    data: {},
  });
};
export const remove = (req, res) => {
  res.status(204);
  res.end();
};

export const changePassword = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id } = decoded;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    const passwordMatch = await verifyPassword(body.oldPassword, user.password);

    if (!passwordMatch) {
      return next({
        message: "Invalid old password",
        status: 400,
      });
    }

    const newPassword = await encryptPassword(body.newPassword);

    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });

    res.json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const filter = async (req, res, next) => {
  const { gameType, skill } = req.query;
  try {
    const listGames = gameType
      ? gameType.split("-")
      : ["Action", "Sport", "Metal"];
    const listSkill = skill ? skill.split("-").map(Number) : [1, 2, 3, 4, 5];

    const users = await prisma.user.findMany({
      where: {
        interests: {
          some: {
            categoryGame: {
              in: listGames,
            },
            skill: {
              in: listSkill,
            },
          },
        },
      },

      select: {
        id: true,
        username: true,
        name: true,
        lastName: true,
        email: true,
        schedule: true,
        image: true,
        favoritePlatform: true,
        age: true,
        interests: {
          select: {
            image: true,
            categoryGame: true,
            skill: true,
          },
        },
      },
    });

    res.json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const myProfile = async (req, res, next) => {
  const { decoded = {} } = req;
  const { id } = decoded;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        interests: true,
        requestEmisor: true,
        requestRecepetor: true,
      },
    });
    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  const { body = {}, decoded = {} } = req;
  const { id } = decoded;

  const { interests } = body;

  console.log(body);
  // convierto en arreglo la propiedad favorite si es que viene

  // ahora elimino la propiedad interests del objeto body
  delete body.interests;

  if (interests) {
    body.interests = {
      deleteMany: {},
      create: interests,
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
      include: {
        interests: true,
      },
    });

    user.password = undefined;

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfilePhoto = async (req, res, next) => {
  const { body = {}, decoded = {}, files } = req;
  const { id } = decoded;
  let image = null;

  try {
    if (files?.length > 0) {
      const promises = files.map((file) => uploadFiles(file.path));
      image = await Promise.all(promises);
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
    }

    if (image) {
      body.image = image[0].url;
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
      include: {
        interests: true,
      },
    });

    user.password = undefined;

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const list = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        username: true,
        email: true,
        image: true,
        age: true,
        gender: true,
        bio: true,
        favoritePlatform: true,
        schedule: true,
        interests: true,
      },
    });

    res.json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
