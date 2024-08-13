"use client";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

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

    const res = await placeOrder(productsToOrder, address);

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
      <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>

      <div className="mb-10">
        <p className="text-xl">
          Nombre: {address.firstName} {address.lastName}
        </p>
        <p>Direccion: {address.address}</p>
        <p>Direccion 2: {address.address2}</p>
        <p>Codigo postal: {address.postalCode}</p>
        <p>
          Pais y Ciudad: {address.city}, {address.country}
        </p>
        <p>Telefono: {address.phone}</p>
      </div>

      {/* Divider */}
      <div className="h-0.5 w-full bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2 "> Resumen de orden</h2>

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
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>
        <p className="text-red-500">{errorMessage}</p>
        <button
          //href="/orders/123"
          onClick={onPlaceOrder}
          className="flex btn-primary justify-center"
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
