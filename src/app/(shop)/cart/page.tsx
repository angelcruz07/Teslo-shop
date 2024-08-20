import { Title } from "@/components";
import Link from "next/link";
import { OrderSummary } from "./ui/OrderSummary";
import { ProductsInCart } from "./ui/ProductsInCart";

export default function Cart() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1100px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5 ">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className="underline mb-5">
              Continua comprando
            </Link>

            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className="bg-white flex flex-col justify-between rounded-xl shadow-xl p-7">
            <div>
              <h2 className="text-2xl mb-2 ">Resumen de orden</h2>
              <OrderSummary />
            </div>
            <div>
              <Link
                href="/checkout/address"
                className="flex btn-primary justify-center"
              >
                Hacer pedido
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
