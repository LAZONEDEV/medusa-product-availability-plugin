import BadRequestHttpClientError from "../errors/BadRequestHttpClientError";
import { computeURL } from "./computeURL";

class HTTPClient {
  private baseURL: string;
  private defaultOptions: RequestInit = {};

  constructor(baseURL: string, defaultOptions?: RequestInit) {
    this.baseURL = baseURL;
    if (defaultOptions) {
      this.defaultOptions = defaultOptions;
    }
  }

  private async request<T = any>(
    url: string,
    options: RequestInit,
  ): Promise<T | undefined> {
    const allOptions = {
      ...this.defaultOptions,
      ...options,
    };

    try {
      const fullURL = computeURL(this.baseURL, url);
      const response = await fetch(fullURL, allOptions);
      if (response.status === 204) {
        return;
      }
      const data = await response.json();

      if (response.status === 400) {
        throw new BadRequestHttpClientError(
          data.message || "Bad request",
          data.errors,
        );
      }

      if (!response.ok) {
        throw new Error(data.message || "Fetching failed");
      }

      return data as T;
    } catch (error) {
      throw error;
    }
  }

  private async requestWithBody<T = any, P = any>(
    method: string,
    url: string,
    data: P,
    { headers, ...reqOptions }: RequestInit = {},
  ): Promise<T | undefined> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...reqOptions,
      body: JSON.stringify(data),
    };

    return this.request<T>(url, options);
  }

  async get<T = any>(
    url: string,
    reqOptions: RequestInit = {},
  ): Promise<T | undefined> {
    const options: RequestInit = {
      method: "GET",
      ...reqOptions,
    };

    return this.request<T>(url, options)!;
  }

  async post<T = any, P = any>(
    url: string,
    data: P,
    req: RequestInit = {},
  ): Promise<T | undefined> {
    return this.requestWithBody("POST", url, data, req);
  }

  async put<T = any, P = any>(
    url: string,
    data: P,
    req: RequestInit = {},
  ): Promise<T | undefined> {
    return this.requestWithBody("PUT", url, data, req);
  }

  async patch<T = any, P = any>(
    url: string,
    data: P,
    req: RequestInit = {},
  ): Promise<T | undefined> {
    return this.requestWithBody("PATCH", url, data, req);
  }

  async delete<T = any>(
    url: string,
    reqOptions: RequestInit = {},
  ): Promise<T | undefined> {
    const options: RequestInit = {
      method: "DELETE",
      ...reqOptions,
    };

    return this.request<T>(url, options);
  }
}

export default HTTPClient;
