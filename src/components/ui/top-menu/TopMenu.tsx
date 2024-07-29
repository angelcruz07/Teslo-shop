'use client'
import { titleFont } from '@/config/fonts'
import { IconMenuDeep, IconSearch, IconShoppingCart } from '@tabler/icons-react'
import Link from 'next/link'
import { useUIStore } from '@/store'

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)

  return (
    <div className='flex px-5 justify-between items-center w-full'>

      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={` ${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Menu */}
      <div className='hidden sm:block'>

        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/men'>
          Hombre
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/women'>
          Mujeres
        </Link>
        <Link
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          href='/category/kid'>
          Niños
        </Link>

      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
          <IconSearch stroke={2} className='w-5 h-5' />
        </Link>

        <Link href='/cart' className='mx-2'>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2  text-white bg-blue-700'>
              3
            </span>
            <IconShoppingCart stroke={2} className='w-5 h-5' />
          </div>
        </Link>

        <button
          onClick={openSideMenu}
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
          <IconMenuDeep stroke={2} />
        </button>

      </div>

    </div>
  )
}
