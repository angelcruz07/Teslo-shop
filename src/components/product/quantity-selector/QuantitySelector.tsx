'use client'
import { IconCircleMinus, IconCirclePlus } from '@tabler/icons-react'
import { useState } from 'react'

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  const onQuantityChange = (value: number) => {
    if (count < 1) return

    setCount(count + value)
  }

  return (
    <div className='flex items-center'>
      <button onClick={() => onQuantityChange(-1)}>
        <IconCircleMinus stroke={2} size={30} />
      </button>
      <span className='w-20 mx-3 px-5 bg-gray-200 text-center rounded'>
        {count}
      </span>
      <button onClick={() => onQuantityChange(+1)}>
        <IconCirclePlus stroke={2} size={30} />
      </button>
    </div>
  )
}
