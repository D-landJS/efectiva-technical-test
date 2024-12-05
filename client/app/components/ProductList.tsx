import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import LoadingSpinner from './LoadingSpinner';
import { Product } from '../interfaces/Product';
import { useCart } from '../context/CartContext';
import Toast from './Toast';
import Pagination from './Pagination';
import usePagination from '../hooks/usePagination';

const ProductList: React.FC = () => {
	const { products, error, loading } = useProducts();
	const { addToCart } = useCart();

	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [toastType, setToastType] = useState<'error' | 'success' | null>(null);

	const itemsPerPage = 6;
	const { currentPage, totalPages, currentItems, setPage } =
		usePagination<Product>(products.length, itemsPerPage);

	const handleAddToCart = (product: Product) => {
		console.log('Producto añadido al carrito:', product);
		addToCart({
			id: product.id,
			productId: product.id,
			productName: product.name,
			productPrice: product.price,
			productImageUrl: product.imageUrl,
			productDescription: product.description,
			quantity: 1,
		});

		setToastMessage('Producto añadido al carrito');
		setToastType('success');

		setTimeout(() => {
			setToastMessage(null);
		}, 3000);
	};

	if (error) {
		return <div className="text-red-500">Error: {error}</div>;
	}

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<div>
			{toastMessage && (
				<Toast
					message={toastMessage}
					type={toastType!}
					onClose={() => setToastMessage(null)}
				/>
			)}

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{currentItems(products).length > 0 ? (
					currentItems(products).map(product => (
						<ProductCard
							key={product.id}
							product={product}
							onAddToCart={handleAddToCart}
						/>
					))
				) : (
					<div>No products found.</div>
				)}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setPage}
			/>
		</div>
	);
};

export default ProductList;
