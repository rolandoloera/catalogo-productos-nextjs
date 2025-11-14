export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    rol?: string;
  };
}

export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: string;
}

