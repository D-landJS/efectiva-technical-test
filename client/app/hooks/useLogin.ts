import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/auth/AuthContext';

interface UseLoginResult {
	email: string;
	password: string;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	handleSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	error: string | null;
	success: boolean;
	toastMessage: string;
	toastType: 'error' | 'success';
	showToast: boolean;
	setShowToast: (show: boolean) => void;
}

export const useLogin = (): UseLoginResult => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'error' | 'success'>('error');
	const { login, error, loading, success } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(email, password);
		setShowToast(true);
	};

	useEffect(() => {
		if (success) {
			router.push('/products');
			setToastMessage('Login exitoso!');
			setToastType('success');
		} else if (error) {
			setToastMessage(error || 'Usuario o contraseña incorrectos');
			setToastType('error');
		}
	}, [success, error, router]);

	return {
		email,
		password,
		setEmail,
		setPassword,
		handleSubmit,
		loading,
		error,
		success,
		toastMessage,
		toastType,
		showToast,
		setShowToast,
	};
};
