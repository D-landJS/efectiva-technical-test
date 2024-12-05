'use client';

import localFont from 'next/font/local';
import './globals.css';
import { CartProvider } from './context/CartContext';
import Header from './layout/Header';
import { AuthProvider } from './context/auth/AuthContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	useEffect(() => {
		if (pathname !== '/auth/login') {
			window.location.reload();
		}
	}, []);

	const shouldShowHeader = pathname !== '/auth/login';

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<AuthProvider>
					<CartProvider>
						{shouldShowHeader && <Header />} <main>{children}</main>
					</CartProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
