'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Cart from '../components/Cart';
import Toast from '../components/Toast';
import { useRouter } from 'next/navigation';

const CartPage: React.FC = () => {
	const { cart, removeFromCart, getTotal, fetchCartData } = useCart();
	const totalPrice = getTotal();

	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		fetchCartData();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			router.push('/auth/login');
		}
	}, [router]);

	const handleRemoveFromCart = (id: number) => {
		removeFromCart(id);
		setToastMessage('Artículo eliminado del carrito');
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Carrito de Compras</h1>
			<Cart
				cartItems={cart}
				onRemoveFromCart={handleRemoveFromCart}
				totalPrice={totalPrice}
			/>

			{/* Mostrar el Toast si hay un mensaje */}
			{toastMessage && (
				<Toast
					message={toastMessage}
					type="success"
					onClose={() => setToastMessage(null)}
				/>
			)}
		</div>
	);
};

export default CartPage;
