export async function fetchProducts() {
	const response = await fetch('https://localhost:7247/api/Products');
	const data = await response.json();

	return data.result || [];
}
