'use client';

import React from 'react';
import RegisterForm from '@/app/components/auth/RegisterForm';

const LoginPage: React.FC = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<RegisterForm />
		</div>
	);
};

export default LoginPage;
