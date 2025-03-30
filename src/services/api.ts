import axios from 'axios';

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface LoginResponse {
  token: string;
}


const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

export const setupAxiosInterceptors = (token: string | null) => {
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const fakeLogin = async (email: string, password: string): Promise<LoginResponse> => {
  if (!email || !password) {
    throw new Error('Por favor completa todos los campos');
  }
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'fake-jwt-token-123456789' });
    }, 500);
  });
};
    

export const fetchPhotos = async (limit = 2000) => {
  try {
    const response = await api.get(`/photos?_limit=${limit}`);
    return response;
  } catch (error) {
    console.error('Error al obtener fotos:', error);
    throw error;
  }
};

export default api; 