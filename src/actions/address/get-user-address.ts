"use server";
import prisma from "@/lib/prisma";

export async function getUserAddress(userId: string) {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!address) return null;

    const { countryId, address2, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : "",
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}
