import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

interface ApiResponse<T> {
  code: '200' | '401' | '500';
  data: T;
  msg: string | null;
}

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeInterceptors();
  }

  private async handleRequest<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const response = await promise;
      const { data } = response;

      if (response.status === 201 || response.status === 200) {
        return data;
      } else {
        this.handleErrorResponse(response);
        throw new Error(JSON.stringify(response) || 'Unknown error');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private handleUnauthorized() {
    localStorage.removeItem('token');
    // 保留基础跳转逻辑
    window.location.href = '/account/login';
  }

  private handleErrorResponse<T>(response: AxiosResponse<T, any>) {
    switch (response.status) {
      case 401:
        this.handleUnauthorized();
        break;
      default:
        console.error(`API Error: ${response.status}`, response);
    }
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );
  }

  public async get<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.get<R>(url, config));
  }

  public async post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.post<R>(url, data, config));
  }

  public async put<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.put<R>(url, data, config));
  }

  public async delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.delete<R>(url, config));
  }
}

export default HttpClient;