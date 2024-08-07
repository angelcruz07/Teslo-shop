import { IconCircleMinus, IconCirclePlus } from "@tabler/icons-react";

interface Props {
  quantity: number;

  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex items-center">
      <button onClick={() => onValueChange(-1)}>
        <IconCircleMinus stroke={2} size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
        {quantity}
      </span>
      <button onClick={() => onValueChange(+1)}>
        <IconCirclePlus stroke={2} size={30} />
      </button>
    </div>
  );
};
