export async function login(username: string, password: string) {
	try {
		const response = await fetch('https://localhost:7247/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData?.ErrorMessages?.[0] || 'Usuario o contraseña incorrectos'
			);
		}

		const data = await response.json();

		return data.result.token;
	} catch (error) {
		throw new Error((error as Error).message || 'An error occurred');
	}
}

export async function register(
	username: string,
	email: string,
	password: string
) {
	try {
		const response = await fetch('https://localhost:7247/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData?.ErrorMessages?.[0] || 'Registration failed');
		}

		return true;
	} catch (error) {
		throw new Error((error as Error).message || 'An error occurred');
	}
}
