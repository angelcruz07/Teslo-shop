"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function setUserRol(userId: string, role: string) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "debes ser administrador",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";

    const user = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (e) {
    return {
      ok: false,
      message: "debes ser administrador",
    };
  }
}
