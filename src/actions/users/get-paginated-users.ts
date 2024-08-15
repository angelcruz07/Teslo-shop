"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getPaginatedUsers() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "No tienes permiso para esta accion",
    };
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return {
      ok: true,
      users: users,
    };
  } catch (e) {
    console.log(e);

    return {
      ok: false,
      message: "No se pudieron obtener los usuarios",
    };
  }
}
