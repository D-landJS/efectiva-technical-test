interface ToastProps {
	message: string;
	type: 'error' | 'success';
	onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
	return (
		<div
			className={`fixed bottom-4 left-4 z-50 px-4 py-2 rounded-lg text-white shadow-lg ${
				type === 'error' ? 'bg-red-600' : 'bg-green-600'
			}`}
		>
			<div className="flex justify-between items-center">
				<span>{message}</span>
				<button className="ml-2 text-white" onClick={onClose}>
					×
				</button>
			</div>
		</div>
	);
};

export default Toast;
