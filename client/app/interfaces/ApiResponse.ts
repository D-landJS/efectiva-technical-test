export interface APIResponse<T> {
	statusCode: number;
	isSuccessfull: boolean;
	result?: T;
	errorMessages?: string[];
}
