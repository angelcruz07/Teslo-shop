"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded === true) {
      router.replace("/empty");
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) return <p>...Loading</p>;

  return (
    <div className="grid grid-cols-2">
      <span className="">No. Productos</span>
      <span className="text-right">
        {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}{" "}
      </span>

      <span className="">Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span className="">Impuestos %15 </span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-20">Total: </span>
      <span className="mt-20 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
