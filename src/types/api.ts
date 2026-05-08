export interface ApiResponse<T = any> {
  status: 'success' | 'fail' | 'error';
  data: T;
  message?: string;
  results?: number;
  [key: string]: any; 
}

export interface ApiError {
  status: 'fail' | 'error';
  message: string;
  code?: number;
}
