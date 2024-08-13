import { IconCreditCard } from "@tabler/icons-react";
import clsx from "clsx";

interface Props {
  isPaid: boolean;
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": !isPaid,
          "bg-green-700": isPaid,
        },
      )}
    >
      <IconCreditCard stroke={2} />
      <span className="mx-2">{isPaid ? "Pagada" : "No pagada"}</span>
    </div>
  );
};
