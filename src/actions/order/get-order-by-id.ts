"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getOrderById(orderId: string) {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${orderId} no existe`;

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `${orderId} no es de ese usuario`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Orden no existe",
    };
  }
}
