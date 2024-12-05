import { CartState, CartAction } from '../types/cartTypes';

export const initialState: CartState = {
	cart: [],
	loading: false,
	error: null,
};

export const cartReducer = (
	state: CartState,
	action: CartAction
): CartState => {
	switch (action.type) {
		case 'ADD_TO_CART':
			return { ...state, cart: [...state.cart, action.product] };
		case 'REMOVE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(item => item.id !== action.productId),
			};
		case 'SET_CART':
			return { ...state, cart: action.cart };
		case 'SET_LOADING':
			return { ...state, loading: action.loading };
		case 'SET_ERROR':
			return { ...state, error: action.error };
		default:
			return state;
	}
};
