import { getOrderById, getShipment } from "@/actions";
import { PayPalButton, Title } from "@/components";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderDetail({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const shippingAddress = order!.OrderAddress;

  const originAddress = {
    postalCode: "50000",
    countryCode: "MX",
  };

  const destinationAddress = {
    postalCode: shippingAddress!.postalCode,
    countryCode: shippingAddress!.countryId,
  };

  //  const shipment = await getShipment(originAddress, destinationAddress);

  // console.log(shipment.DHL);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1100px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Cart */}
          <div className="flex flex-col mt-5 ">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug} className="flex">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {shippingAddress!.firstName} {shippingAddress!.lastName}
              </p>
              <p>{shippingAddress!.address}</p>
              <p>{shippingAddress!.address2}</p>
              <p>{shippingAddress!.postalCode}</p>
              <p>
                {shippingAddress!.city}, {shippingAddress!.countryId}
              </p>
              <p>{shippingAddress!.phone}</p>
            </div>

            {/* Divider */}
            <div className="h-0.5 w-full bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 "> Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span className="">No. Productos</span>
              <span className="text-right">
                {order!.itemsInOrder === 1
                  ? "1 articulo"
                  : `${order!.itemsInOrder} articulos`}
              </span>
              <span className="">Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>
              <span className="">Impuestos ($15) </span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>
              <span className="text-2xl mt-5">Total</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PayPalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
