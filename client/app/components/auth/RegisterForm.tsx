import React from 'react';
import Toast from '../Toast';
import { useRegister } from '@/app/hooks/useRegister';

const RegisterForm: React.FC = () => {
	const {
		email,
		password,
		confirmPassword,
		username,
		setEmail,
		setPassword,
		setConfirmPassword,
		setUsername,
		handleSubmit,
		loading,
		error,
		toastMessage,
		toastType,
		showToast,
		setShowToast,
	} = useRegister();

	return (
		<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
				Crear cuenta
			</h2>
			<form onSubmit={handleSubmit}>
				<div className="mb-6">
					<label
						htmlFor="username"
						className="block text-sm font-medium text-gray-600 mb-2"
					>
						Usuario
					</label>
					<input
						type="text"
						id="username"
						className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-600 mb-2"
					>
						Correo Electrónico
					</label>
					<input
						type="email"
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
				<div className="mb-6">
					<label
						htmlFor="confirmPassword"
						className="block text-sm font-medium text-gray-600 mb-2"
					>
						Confirmar Contraseña
					</label>
					<input
						type="password"
						id="confirmPassword"
						className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
					Crear cuenta
				</button>
			</form>

			{loading && (
				<div className="text-center text-indigo-600">Cargando...</div>
			)}

			{error && <div className="text-center text-red-600">{error}</div>}

			<div className="mt-4 text-center">
				<p className="text-sm text-gray-600">
					¿Ya tienes una cuenta?{' '}
					<a href="/auth/login" className="text-indigo-600 hover:underline">
						Inicia sesión aquí
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

export default RegisterForm;
