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

  private async handleRequest<T>(promise: Promise<AxiosResponse<ApiResponse<T>>>): Promise<T> {
    try {
      const response = await promise;
	  debugger
      const { data } = response;

      if (data.code === '200') {
        return data.data;
      } else {
        this.handleErrorResponse(data);
        throw new Error(data.msg || 'Unknown error');
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

  private handleErrorResponse<T>(response: ApiResponse<T>) {
    switch (response.code) {
      case '401':
        this.handleUnauthorized();
        break;
      default:
        console.error(`API Error: ${response.code}`, response.msg);
    }
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = token;
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
    return this.handleRequest<R>(this.instance.get<ApiResponse<R>>(url, config));
  }

  public async post<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.post<ApiResponse<R>>(url, data, config));
  }

  public async put<T, R>(url: string, data?: T, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.put<ApiResponse<R>>(url, data, config));
  }

  public async delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.handleRequest<R>(this.instance.delete<ApiResponse<R>>(url, config));
  }
}

export default HttpClient;