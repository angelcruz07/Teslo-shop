import { Title } from '@/components'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { IconCreditCard } from '@tabler/icons-react'
import { initialData } from '@/seed/seed'

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2]
]

interface Props {
  params: {
    id: string
  }
}

export default function OrderDetail({ params }: Props) {
  const { id } = params

  //Todo: verificar

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1100px]'>
        <Title title={`Orden #${id}`} />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Cart */}

          <div className='flex flex-col mt-5 '>
            <div
              className={clsx(
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': false,
                  'bg-green-700': true
                }
              )}>
              <IconCreditCard stroke={2} />
              {/* <span className='mx-2'>Pendiente de pago</span> */}
              <span className='mx-2'>Orden pagada</span>
            </div>

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

            <div className='mt-5'>
              <div
                className={clsx(
                  'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                  {
                    'bg-red-500': false,
                    'bg-green-700': true
                  }
                )}>
                <IconCreditCard stroke={2} />
                {/* <span className='mx-2'>Pendiente de pago</span> */}
                <span className='mx-2'>Orden pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
