'use client'
import { IconSearch, IconX } from '@tabler/icons-react'
import { useState } from 'react'

export const Sidebar = () => {
	return (
		<div>
			{/* Backgroud black */}
			<div className='fixed top-0 left-0 z-10 w-screen opacity-30 bg-black h-screen'></div>

			{/* Blur */}
			<div className='fade-in fixed top-0 left-0 w-screen z-10 backdrop-filter backdrop-blur-sm'></div>

			{/* Sidemenu */}
			<nav
				// todo: efecto slide
				className='fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-10 shadow-2xl transfrom transition-all duration-300'>
				<IconX
					stroke={2}
					size={50}
					className='absolute top-5 right-5 cursor-pointer'
					onClick={() => console.log('click')}
				/>

				{/* Input search */}
				<div className='relative mt-14 '>
					<IconSearch stroke={2} size={20} className='absolute top-2 left-2' />
					<input
						type='text'
						placeholder='Buscar'
						className='w-full bg-gray-50 rounded pl-10 pr-10 broder-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
					/>
				</div>
			</nav>
		</div>
	)
}
