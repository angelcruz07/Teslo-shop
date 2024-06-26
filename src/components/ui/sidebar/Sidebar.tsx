'use client'
import { useUIStore } from '@/store'
import {
	IconLogin,
	IconLogout,
	IconSearch,
	IconShirt,
	IconTicket,
	IconUser,
	IconUsers,
	IconX
} from '@tabler/icons-react'
import Link from 'next/link'
import clxs from 'clsx'

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
	const closeMenu = useUIStore((state) => state.closeSideMenu)

	return (
		<div>
			{/* Backgroud black */}
			{isSideMenuOpen && (
				<div className='fixed top-0 left-0 z-10 w-screen opacity-30 bg-black h-screen' />
			)}

			{/* Blur */}
			{isSideMenuOpen && (
				<div
					onClick={closeMenu}
					className='fade-in fixed top-0 left-0 w-screen z-10 backdrop-filter backdrop-blur-sm'
				/>
			)}

			{/* Sidemenu */}
			<nav
				className={clxs(
					'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-10 shadow-2xl transfrom transition-all duration-300',
					{
						'translate-x-full': !isSideMenuOpen
					}
				)}>
				<IconX
					stroke={2}
					size={50}
					className='absolute top-5 right-5 cursor-pointer'
					onClick={closeMenu}
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
				{/* Menu */}
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconUser stroke={2} size={30} />
					<span className='ml-3 text-xl'>Perfil</span>
				</Link>
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconTicket stroke={2} size={30} />
					<span className='ml-3 text-xl'>Ordenes</span>
				</Link>
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconLogin stroke={2} size={30} />
					<span className='ml-3 text-xl'>Ingresar</span>
				</Link>
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconLogout stroke={2} size={30} />
					<span className='ml-3 text-xl'>Salir</span>
				</Link>

				{/* Line separator  */}
				<div className='w-full h-px bg-gray-200 my-10' />
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconShirt stroke={2} size={30} />
					<span className='ml-3 text-xl'>Productos</span>
				</Link>
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconTicket stroke={2} size={30} />
					<span className='ml-3 text-xl'>Ordenes</span>
				</Link>
				<Link
					href='/'
					className='flex items-center mt-0 p-2 hover:bg-gray-100 rounded transition-all'>
					<IconUsers stroke={2} size={30} />
					<span className='ml-3 text-xl'>Usuarios</span>
				</Link>
			</nav>
		</div>
	)
}
