export const revalidate = 604800; // 7 Dias

import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  console.log(product?.images[1]);

  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: [`/products/${product?.images?.[1]}`],
    },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Mobile Slideshow */}
      <div className="col-span-1 md:col-span-2 block md:hidden">
        <ProductMobileSlideshow images={product.images} title={product.title} />
      </div>

      {/* Desktop Slideshow */}
      <div className="col-span-1 md:col-span-2 hidden md:block">
        <ProductSlideshow images={product.images} title={product.title} />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        {/* Title product */}

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5 font-bold">${product.price}</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
