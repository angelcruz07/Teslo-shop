import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector
} from '@/components'
import { titleFont } from '@/config/fonts'
import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export default function ({ params }: Props) {
  const { slug } = params

  const product = initialData.products.find((product) => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className='mt-5 mb-20 grid md:grid-cols-3 gap-3'>
      {/* Mobile Slideshow */}
      <div className='col-span-1 md:col-span-2 block md:hidden'>
        <ProductMobileSlideshow images={product.images} title={product.title} />
      </div>

      {/* Desktop Slideshow */}
      <div className='col-span-1 md:col-span-2 hidden md:block'>
        <ProductSlideshow images={product.images} title={product.title} />
      </div>

      {/* Details */}
      <div className='col-span-1 px-5'>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className='text-lg mb-5 font-bold'>${product.price}</p>
        {/* Selector de tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={2} />

        <button className-='btn-primary my-5'>Añadir al carrito</button>

        {/* Description */}
        <h3 className='font-bold text-sm'>Descripcion</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
