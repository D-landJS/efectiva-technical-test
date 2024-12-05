'use client';

import { login, register } from '@/app/queries/auth.api';
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
	login: (email: string, password: string) => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	logout: () => void;
	error: string | null;
	loading: boolean;
	success: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	const handleLogin = async (email: string, password: string) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const token = await login(email, password);

			if (token) {
				localStorage.setItem('authToken', token);
				setSuccess(true);
			} else {
				setError('Token no recibido');
			}
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (
		username: string,
		email: string,
		password: string
	) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			await register(username, email, password);
			setSuccess(true);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('authToken');
		localStorage.removeItem('cart');
		setSuccess(false);
	};

	return (
		<AuthContext.Provider
			value={{
				login: handleLogin,
				register: handleRegister,
				logout: handleLogout,
				error,
				loading,
				success,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
