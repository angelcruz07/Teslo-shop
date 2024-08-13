"use server";

import prisma from "@/lib/prisma";

export async function deleteUserAddress(userId: string) {
  try {
    const deleted = await prisma.userAddress.delete({
      where: {
        userId: userId,
      },
    });

    return {
      ok: true,
      message: "Direcccion eliminada correctamente",
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "No se pudo eliminar la direccion",
    };
  }
}
