import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../queries/auth.api';

interface UseRegisterResult {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	setUsername: (username: string) => void;
	setEmail: (email: string) => void;
	setPassword: (password: string) => void;
	setConfirmPassword: (password: string) => void;
	handleSubmit: (e: React.FormEvent) => void;
	loading: boolean;
	error: string | null;
	success: boolean;
	toastMessage: string;
	toastType: 'error' | 'success';
	showToast: boolean;
	setShowToast: (show: boolean) => void;
}

export const useRegister = (): UseRegisterResult => {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastType, setToastType] = useState<'error' | 'success'>('error');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setToastMessage('Las contraseñas no coinciden');
			setToastType('error');
			setShowToast(true);
			return;
		}

		try {
			setLoading(true);
			setError(null);
			setSuccess(false);

			await register(username, email, password);

			setSuccess(true);
			setToastMessage('Registro exitoso!');
			setToastType('success');
			setShowToast(true);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message || 'Error al registrar');
				setToastMessage(error.message);
			} else {
				setError('Un error desconocido ocurrió');
				setToastMessage('Un error desconocido ocurrió');
			}
			setToastType('error');
			setShowToast(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (success) {
			router.push('/auth/login');
		}
	}, [success, router]);

	return {
		email,
		username,
		password,
		confirmPassword,
		setEmail,
		setUsername,
		setPassword,
		setConfirmPassword,
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
