import { Router } from "express";
import { prisma } from "../../../../database.js";

const router = Router();

//Todos los usuarios
export const getAllUser = async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    console.log(response);
    res.status(200).json({
      status: "success",
      message: "Trae todos los usuarios",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Existe un problema al obtener todos los usuarios",
      msg: error.message,
    });
  }
};

// incluir matches, conversaciones, e intereses

export const getUserById = async (req, res) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Trae el usuario por id",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Existe un problema al obtener el usuario por id",
      msg: error.message,
    });
  }
};

// Get por Username
export const getUserByUsername = async (req, res) => {
  const { ...username } = req.params;
  console.log(username);
  const response = await prisma.user.findUnique(
    {
      where: {
        username: req.params.username,
      },
    },
    res.status(200).json({
      status: "success",
      message: "Trae el usuario por Username",
      data: response,
    })
  );
};

//   try {
//     const response = await prisma.user.findUnique({
//       where: {
//         id: req.params.username
//       },
//     })
//     res.status(200).json({
//       status: 'success', message: 'Trae el usuario por Username', data: response
//     })
//   } catch (error) {
//     res.status(400).json({
//       status: 'error', message: 'Existe un problema al obtener el usuario por Username', msg: error.message
//     })
//   }
// }

export const UpdateUser = async (req, res) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const response = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
    console.log(response);
    res.status(200).json({
      status: "success",
      message: "Usuario Actualizado",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Existe un problema en la actualizacion del usuario",
      msg: error.message,
    });
  }
};

// Eliminacion de usuarios
export const UserDelete = async (req, res) => {
  const { body } = req;
  try {
    const response = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
      // data: {
      //   ... body
      // }
    });
    res.status(200).json({
      status: "success",
      message: "Usuario Eliminado correctamente",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Existe problemas en la eliminacion del usuario",
      msg: error.message,
    });
  }
};

export default router;
