"use client";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  //Sacar la direccion del envio
  const shippingAddress = useAddressStore((state) => state.shippingAddress);
  const {
    city,
    phone,
    country,
    address,
    address2,
    lastName,
    firstName,
    postalCode,
  } = shippingAddress;

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const res = await placeOrder(productsToOrder, shippingAddress);

    if (!res.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(res.message);
      return;
    }

    // Todo salio bien
    clearCart();
    router.replace("/orders/" + res.order?.id);
  };
  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-5 font-bold">Direccion de entrega</h2>

      <div className="mb-5">
        <p>
          <strong>Nombre:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Direccion:</strong> {address}
        </p>
        <p>
          <strong>Direccion 2:</strong> {address2}
        </p>
        <p>
          <strong>Codigo postal:</strong> {postalCode}
        </p>
        <p>
          <strong>Pais y Ciudad:</strong> {city}, {country}
        </p>
        <p>
          <strong>Telefono:</strong> {phone}
        </p>
      </div>

      {/* Divider */}
      <div className="h-0.5 w-full bg-gray-200 mb-10" />
      <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 artículo" : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot; aceptas nuestros
            <Link href="/" className="underline">
              <span> </span>
              términos y condiciones
            </Link>
          </span>
        </p>
        <p className="text-red-500 mb-5">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          className="flex btn-primary justify-center
          "
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
