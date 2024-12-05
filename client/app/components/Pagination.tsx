interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className="flex justify-center items-center mt-6 space-x-2">
			{/* Botón Anterior */}
			<button
				className={`px-3 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 ${
					currentPage === 1 && 'opacity-50 cursor-not-allowed'
				}`}
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				←
			</button>

			{/* Números de Páginas */}
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={`px-4 py-2 rounded ${
						currentPage === index + 1
							? 'bg-blue-500 text-white'
							: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
					}`}
					onClick={() => handlePageChange(index + 1)}
				>
					{index + 1}
				</button>
			))}

			{/* Botón Siguiente */}
			<button
				className={`px-3 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 ${
					currentPage === totalPages && 'opacity-50 cursor-not-allowed'
				}`}
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				→
			</button>
		</div>
	);
};

export default Pagination;
