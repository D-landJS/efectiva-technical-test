'use client';

import { useState, useEffect } from 'react';
import { fetchProducts } from '../queries/products.api';
import { Product } from '../interfaces/Product';

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const data = await fetchProducts();
				setProducts(data);
			} catch (err) {
				setError((err as Error).message);
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, []);

	return { products, error, loading };
};
