'use client'
import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Props {
	product: Product
}

export const ProductGridItem = ({ product }: Props) => {
	const [display, setDisplayImage] = useState(product.images[0])

	const handleImage = () => {
		setDisplayImage(product.images[1])
	}
	const mouseEnter = () => {
		setDisplayImage(product.images[0])
	}

	return (
		<div className='rounded-md overflow-hidden fade-in'>
			<Link href={`/product/${product.slug}`}>
				<Image
					src={`/products/${display}`}
					alt={product.title}
					className='w-full object-cover rounded'
					height={500}
					width={500}
					onMouseLeave={() => {
						setDisplayImage(product.images[0])
					}}
					onMouseEnter={() => {
						setDisplayImage(product.images[1])
					}}
				/>
			</Link>
			<div className='p-4 flex flex-col'>
				<Link className='hover:text-blue-500' href={`/product/${product.slug}`}>
					{product.title}
				</Link>
				<span className='font-bold'>${product.price}</span>
			</div>
		</div>
	)
}
