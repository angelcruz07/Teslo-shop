import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Link from 'next/link'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function Cart() {
  if (productsInCart.length === 0) redirect('/empty')

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1100px]'>
        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}

          <div className='flex flex-col mt-5 '>
            <span className='text-xl'>Agregar mas items</span>
            <Link href='/' className='underline mb-5'>
              Continua comprando
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className='flex'>
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>

                  <QuantitySelector quantity={3} />
                  <button className='mt-3 underline'>Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2 '> Resumen de orden</h2>
            <div className='grid grid-cols-2'>
              <span className=''>No. Productos</span>
              <span className='text-right'>3 articulos</span>

              <span className=''>Subtotal</span>
              <span className='text-right'>$100</span>

              <span className=''>Impuestos ($15) </span>
              <span className='text-right'>$100</span>

              <span className='text-2xl mt-5'>Total</span>
              <span className='mt-5 text-2xl text-right'>3 articulos</span>
            </div>

            <div>
              <Link
                href='/checkout/address'
                className='flex btn-primary justify-center'>
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
