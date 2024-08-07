"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
// import { sleep } from "@/utils";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    // await sleep(3);
    const inStock = await getStockBySlug(slug);

    setStock(inStock);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <p
          className={`${titleFont.className} antialiased font-bold text-lg animate-pulse bg-gray-200 `}
        >
          &nbsp;
        </p>
      ) : (
        <p className={`${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </p>
      )}
    </>
  );
};
