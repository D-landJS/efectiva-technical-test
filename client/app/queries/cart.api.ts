import { APIResponse } from '../interfaces/ApiResponse';
import { CartItem } from '../interfaces/CartItem';

export async function fetchCartItems(token: string): Promise<CartItem[]> {
	try {
		const response = await fetch('https://localhost:7247/api/cart', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData?.errorMessages?.[0] || 'Failed to fetch cart items'
			);
		}

		const data: APIResponse<CartItem[]> = await response.json();

		return (
			data.result?.map(item => ({
				id: item.id,
				productId: item.productId,
				productName: item.productName,
				productDescription: item.productDescription,
				productPrice: item.productPrice,
				productImageUrl: item.productImageUrl,
				quantity: item.quantity,
			})) || []
		);
	} catch (error) {
		throw new Error(
			(error as Error).message || 'An error occurred while fetching cart items'
		);
	}
}

export async function addItemToCart(
	token: string,
	productId: number,
	quantity: number
): Promise<CartItem | null> {
	try {
		const response = await fetch('https://localhost:7247/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ productId, quantity }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData?.ErrorMessages?.[0] || 'Failed to add item to cart'
			);
		}

		const data: APIResponse<CartItem> = await response.json();
		return data.result || null;
	} catch (error) {
		throw new Error(
			(error as Error).message || 'An error occurred while adding item to cart'
		);
	}
}

export async function removeItemFromCart(
	token: string,
	itemId: number
): Promise<void> {
	try {
		const response = await fetch(`https://localhost:7247/api/cart/${itemId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData?.ErrorMessages?.[0] || 'Failed to remove item from cart'
			);
		}
	} catch (error) {
		throw new Error(
			(error as Error).message ||
				'An error occurred while removing item from cart'
		);
	}
}
