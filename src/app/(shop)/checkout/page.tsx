import { QuantitySelector, Title } from '@/components'
import { initialData } from '@/seed/seed'
import Link from 'next/link'
import Image from 'next/image'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

export default function Checkout() {
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1100px]'>
        <Title title='Verificar orden' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}

          <div className='flex flex-col mt-5 '>
            <span className='text-xl'>Ajustar elementos</span>
            <Link href='/cart' className='underline mb-5'>
              Editar carrito
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
                  <p>${product.price} x 3</p>
                  <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2 font-bold'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>Angel Cruz</p>
              <p>Av. El pepe</p>
              <p>Col. Centro</p>
              <p>Capula</p>
              <p>CP 51603</p>
              <p>123392495</p>
            </div>

            {/* Divider */}
            <div className='h-0.5 w-full bg-gray-200 mb-10' />

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
                href='/orders/123'
                className='flex btn-primary justify-center'>
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
