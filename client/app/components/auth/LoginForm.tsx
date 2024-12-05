import React from 'react';
import Toast from '../Toast';
import { useLogin } from '@/app/hooks/useLogin';

const LoginForm: React.FC = () => {
	const {
		email,
		password,
		setEmail,
		setPassword,
		handleSubmit,
		loading,
		error,
		toastMessage,
		toastType,
		showToast,
		setShowToast,
	} = useLogin();

	return (
		<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
				Iniciar sesión
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-600 mb-2"
					>
						Usuario
					</label>
					<input
						type="text"
						id="email"
						className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-600 mb-2"
					>
						Contraseña
					</label>
					<input
						type="password"
						id="password"
						className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Iniciar sesión
				</button>
			</form>

			{loading && (
				<div className="text-center text-indigo-600">Cargando...</div>
			)}

			{error && <div className="text-center text-red-600">{error}</div>}

			<div className="mt-4 text-center">
				<p className="text-sm text-gray-600">
					¿No tienes una cuenta?{' '}
					<a href="/auth/register" className="text-indigo-600 hover:underline">
						Crea una aquí
					</a>
				</p>
			</div>

			{showToast && (
				<Toast
					message={toastMessage}
					type={toastType}
					onClose={() => setShowToast(false)}
				/>
			)}
		</div>
	);
};

export default LoginForm;
