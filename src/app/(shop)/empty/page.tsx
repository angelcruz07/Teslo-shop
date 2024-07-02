import { IconShoppingCart } from '@tabler/icons-react'
import Link from 'next/link'

export default function Empty() {
  return (
    <div className='flex justify-center items-center h-[800px]'>
      <IconShoppingCart stroke={2} size={80} className='mx-5' />
      <div className='flex flex-col items-center'>
        <h1 className='text-xl font-semibold'>Tu carrito esta vacio</h1>
        <Link href='/' className='text-blue-500 text-4xl mt-2'>
          Regresar
        </Link>
      </div>
    </div>
  )
}
