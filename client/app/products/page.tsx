'use client';

import React, { useEffect } from 'react';
import ProductList from '../components/ProductList';
import { useRouter } from 'next/navigation';

const ProductsPage: React.FC = () => {
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('authToken');

		if (!token) {
			router.push('/auth/login');
		}
	}, [router]);
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Catálogo de Productos</h1>
			<ProductList />
		</div>
	);
};

export default ProductsPage;
