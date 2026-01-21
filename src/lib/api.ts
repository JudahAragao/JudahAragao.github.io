import { z } from "zod";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

export const api = {
  get: <T>(endpoint: string, options?: FetchOptions) => 
    request<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body: any, options?: FetchOptions) => 
    request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body: any, options?: FetchOptions) => 
    request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  patch: <T>(endpoint: string, body: any, options?: FetchOptions) => 
    request<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, options?: FetchOptions) => 
    request<T>(endpoint, { ...options, method: 'DELETE' }),
    
  /**
   * Helper method to perform a GET request and validate the response with a Zod schema.
   * Useful for ensuring type safety at runtime.
   */
  getParsed: <T extends z.ZodType>(endpoint: string, schema: T, options?: FetchOptions): Promise<z.infer<T>> =>
    request<z.infer<T>>(endpoint, { ...options, method: 'GET' }).then(data => schema.parse(data)),
};

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, headers, ...init } = options;
  
  // Ensure the endpoint starts with a slash if not provided, to strictly append to base URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Construct the full URL. 
  // Note: This simple concatenation assumes API_BASE_URL doesn't end with a slash 
  // or handles double slashes gracefully. URL constructor handles absolute paths well.
  const url = new URL(`${API_BASE_URL}${cleanEndpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const config: RequestInit = {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const response = await fetch(url.toString(), config);

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new ApiError(response.status, errorData.message || "An API error occurred", errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
