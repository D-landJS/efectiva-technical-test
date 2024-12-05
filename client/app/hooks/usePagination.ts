import { useState } from 'react';

const usePagination = <T>(totalItems: number, itemsPerPage: number) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const setPage = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	const currentItems = (items: T[]) => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return items.slice(startIndex, startIndex + itemsPerPage);
	};

	return {
		currentPage,
		totalPages,
		currentItems,
		setPage,
	};
};

export default usePagination;
