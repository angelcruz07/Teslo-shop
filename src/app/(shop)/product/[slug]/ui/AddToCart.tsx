"use client";
import { SizeSelector, QuantitySelector } from "@/components";
import { Product, Size } from "@prisma/client";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
  };

  return (
    <>
      <SizeSelector
        onSizeChanged={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />

      {posted && !size && (
        <span className="text-red-500 fade-in mb-2">
          Debe seleccionar una talla*
        </span>
      )}

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Añadir al carrito
      </button>
    </>
  );
};
