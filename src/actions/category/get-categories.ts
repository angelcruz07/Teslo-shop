"use server";

import prisma from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return categories;
  } catch (e) {
    console.log(e);

    return [];
  }
}
