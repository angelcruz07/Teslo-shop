"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export async function deleteProductImage(imageId: number, imageUrl: string) {
  if (!imageUrl.startsWith("http")) {
    return {
      of: false,
      error: "No se pueden borrar imagene de FS",
    };
  }

  const imageName = imageUrl.split("/").pop()?.split(".")[0] ?? "";
  console.log({ imageName });

  try {
    await cloudinary.uploader.destroy(imageName);
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });

    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/admin/products/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "No se pudo eliminar la imagen",
    };
  }
}
