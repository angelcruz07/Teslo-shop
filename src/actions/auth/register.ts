"use server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return {
        ok: false,
        message: "El correo electronico ya esta en uso, prueba con otro",
      };
    }

    const hashedPassword = bcryptjs.hashSync(password);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: "Usuario creado",
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      message: "No se pudo registrar al usuario",
    };
  }
};
