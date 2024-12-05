'use client';

import React from 'react';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth/AuthContext';
import {
	HiShoppingCart,
	HiLogout,
	HiHome,
	HiShoppingBag,
} from 'react-icons/hi';

const Header: React.FC = () => {
	const { cart } = useCart();

	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

	const router = useRouter();
	const { logout } = useAuth();

	const goToProducts = () => {
		router.push('/products');
	};

	const goToCart = () => {
		router.push('/cart');
	};

	const handleLogout = () => {
		logout();
		router.push('/auth/login');
	};

	return (
		<header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 shadow-lg">
			<div className="flex justify-between items-center max-w-screen-xl mx-auto">
				<h1
					className="text-3xl font-extrabold tracking-tight cursor-pointer hover:text-gray-300"
					onClick={() => router.push('/')}
				>
					Ecommerce EFE
				</h1>
				<div className="flex items-center space-x-6">
					<a
						href="#"
						className="text-white text-lg hover:text-gray-300 flex items-center space-x-1"
					>
						<HiHome size={20} />
						<span>Inicio</span>
					</a>
					<button
						className="text-white text-lg hover:text-gray-300 flex items-center space-x-1"
						onClick={goToProducts}
					>
						<HiShoppingBag size={20} />
						<span>Productos</span>
					</button>
					<div className="relative">
						<button
							className="bg-green-600 text-white p-2 rounded-lg shadow-md hover:bg-green-700 transition-all"
							onClick={goToCart}
						>
							<HiShoppingCart size={24} />
							{cartCount > 0 && (
								<span className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-2 py-1">
									{cartCount}
								</span>
							)}
						</button>
					</div>
					<button
						className="bg-red-600 text-white p-2 rounded-lg shadow-md hover:bg-red-700 transition-all flex items-center space-x-1"
						onClick={handleLogout}
					>
						<HiLogout size={20} />
						<span>Cerrar sesión</span>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
