export interface Task {
  id: string;
  title: string;
  completed: boolean;
  user: string;
  photouri?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface TaskResponse {
  id?: string;
  userId?: string;
  title?: string;
  completed?: boolean;
  photoUri?: string;
  createdAt?: Date;
  updatedAt?: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
}
export interface User {
  id: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
}

export interface Response<T> {
  success: boolean;
  count?: number;
  data?: T | null;
  message?: string;
  error?: string;
}

export interface MessageResponse {
  message: string;
}

export interface ImageResponse {
  url?: string;
  key?: string;
  size?: number;
  contentType?: string;
}
