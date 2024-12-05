import React, { useId } from 'react';
import { CartItem } from '../interfaces/CartItem';
import Image from 'next/image';

interface CartProps {
	cartItems: CartItem[];
	onRemoveFromCart: (id: number) => void;
	totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
	cartItems,
	onRemoveFromCart,
	totalPrice,
}) => {
	const idPrefix = useId();

	return (
		<div className="space-y-8 bg-gray-100 p-6 rounded-lg shadow-lg">
			<h2 className="text-3xl font-bold text-gray-800 mb-4">Tu Carrito</h2>
			{cartItems.length === 0 ? (
				<p className="text-lg text-gray-600 text-center">
					🚨 No hay productos en el carrito. ¡Agrega algo para comenzar!
				</p>
			) : (
				<div className="space-y-6">
					{cartItems.map(item => {
						const itemId = `${idPrefix}-${item.id}-${Math.random()}`;
						return (
							<div
								key={itemId} // Usamos el id generado
								className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
							>
								<div className="flex items-center">
									<div className="relative w-20 h-20 rounded-lg overflow-hidden">
										<Image
											src={item.productImageUrl}
											alt={item.productName}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											priority
										/>
									</div>
									<div className="ml-6">
										<h3 className="text-xl font-semibold text-gray-800">
											{item.productName}
										</h3>
										<p className="text-sm text-gray-500">
											Precio unitario:{' '}
											<span className="font-medium text-gray-700">
												${item.productPrice.toFixed(2)}
											</span>
										</p>
										<p className="text-sm text-gray-500">
											Cantidad:{' '}
											<span className="font-medium text-gray-700">
												{item.quantity}
											</span>
										</p>
										<p className="text-sm text-gray-500">
											Subtotal:{' '}
											<span className="font-semibold text-green-600">
												${(item.productPrice * item.quantity).toFixed(2)}
											</span>
										</p>
									</div>
								</div>
								<button
									className="text-red-600 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition duration-200"
									onClick={() => onRemoveFromCart(item.id)}
								>
									Eliminar
								</button>
							</div>
						);
					})}
				</div>
			)}
			<div className="bg-white p-4 rounded-lg shadow-md text-right">
				<p className="text-xl font-bold text-gray-800">
					Total del carrito:{' '}
					<span className="text-green-600">${totalPrice.toFixed(2)}</span>
				</p>
			</div>
			<div className="text-center">
				<button className="bg-green-500 text-white text-lg py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-200">
					🛒 Proceder al Pago
				</button>
			</div>
		</div>
	);
};

export default Cart;
