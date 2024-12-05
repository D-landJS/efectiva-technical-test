import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem } from '../interfaces/CartItem';
import { cartReducer, initialState } from '../reducers/cartReducer';
import {
	addItemToCart,
	fetchCartItems,
	removeItemFromCart,
} from '../queries/cart.api';

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: CartItem) => void;
	removeFromCart: (productId: number) => void;
	getTotal: () => number;
	loading: boolean;
	error: string | null;
	fetchCartData: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
	children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedCart = localStorage.getItem('cart');
			if (savedCart) {
				dispatch({ type: 'SET_CART', cart: JSON.parse(savedCart) });
			}
		}
	}, []);

	const fetchCartData = async () => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			dispatch({ type: 'SET_ERROR', error: 'No estás autenticado' });
			return;
		}

		dispatch({ type: 'SET_LOADING', loading: true });
		dispatch({ type: 'SET_ERROR', error: null });

		try {
			const cartData = await fetchCartItems(token);
			dispatch({ type: 'SET_CART', cart: cartData });

			// Update localStorage with the fetched cart data
			localStorage.setItem('cart', JSON.stringify(cartData));
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'SET_ERROR',
				error: 'Error al cargar los datos del carrito',
			});
		} finally {
			dispatch({ type: 'SET_LOADING', loading: false });
		}
	};

	const addToCart = async (product: CartItem) => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			dispatch({ type: 'SET_ERROR', error: 'No estás autenticado' });
			return;
		}

		dispatch({ type: 'SET_LOADING', loading: true });
		dispatch({ type: 'SET_ERROR', error: null });

		try {
			await addItemToCart(token, product.id, product.quantity);
			dispatch({ type: 'ADD_TO_CART', product });

			// Update localStorage after adding an item
			localStorage.setItem('cart', JSON.stringify(state.cart));
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'SET_ERROR',
				error: 'Error al agregar el producto al carrito',
			});
		} finally {
			dispatch({ type: 'SET_LOADING', loading: false });
		}
	};

	const removeFromCart = async (productId: number) => {
		const token = localStorage.getItem('authToken');
		if (!token) {
			dispatch({ type: 'SET_ERROR', error: 'No estás autenticado' });
			return;
		}

		dispatch({ type: 'SET_LOADING', loading: true });
		dispatch({ type: 'SET_ERROR', error: null });

		try {
			await removeItemFromCart(token, productId);
			dispatch({ type: 'REMOVE_FROM_CART', productId });

			// Update localStorage after removing an item
			localStorage.setItem('cart', JSON.stringify(state.cart));
		} catch (err) {
			console.error(err);
			dispatch({
				type: 'SET_ERROR',
				error: 'Error al eliminar el producto del carrito',
			});
		} finally {
			dispatch({ type: 'SET_LOADING', loading: false });
		}
	};

	const getTotal = () =>
		state.cart.reduce(
			(total, item) => total + item.productPrice * item.quantity,
			0
		);

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				addToCart,
				removeFromCart,
				getTotal,
				loading: state.loading,
				error: state.error,
				fetchCartData,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
