import { CartItem } from '../interfaces/CartItem';

export interface CartState {
	cart: CartItem[];
	loading: boolean;
	error: string | null;
}

export type CartAction =
	| { type: 'ADD_TO_CART'; product: CartItem }
	| { type: 'REMOVE_FROM_CART'; productId: number }
	| { type: 'SET_CART'; cart: CartItem[] }
	| { type: 'SET_LOADING'; loading: boolean }
	| { type: 'SET_ERROR'; error: string | null };
