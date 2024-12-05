import React from 'react';
import Image from 'next/image';
import { Product } from '../interfaces/Product';

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
	return (
		<div className="border p-4 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all">
			<div className="relative w-full h-64 mb-4 overflow-hidden">
				<Image
					src={product.imageUrl}
					alt={product.name}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
			<p className="text-sm text-gray-600 mb-4">{product.description}</p>
			<p className="text-lg font-bold text-blue-500">
				${product.price.toFixed(2)}
			</p>
			<button
				className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
				onClick={() => onAddToCart(product)}
			>
				Añadir al carrito
			</button>
		</div>
	);
};

export default ProductCard;
