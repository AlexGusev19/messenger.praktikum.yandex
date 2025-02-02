enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const HOST = 'https://ya-praktikum.tech/';

interface IOptions {
  method?: METHOD;
  headers?: Record<string, string>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
}

type TRequest = (url: string, options: IOptions) => Promise<XMLHttpRequest>;

export class HTTPTransport {
  basePath: string;

  constructor(path: string) {
    this.basePath = path;
  }

  get: TRequest = (url, options) => {
    return this.request(url, { ...options, method: METHOD.GET });
  };

  put: TRequest = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  post: TRequest = (url: string, options?: IOptions) => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  delete: TRequest = (url: string, options: IOptions) => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  request(url: string, options: IOptions): Promise<XMLHttpRequest> {
    const {
      headers = {
        'Content-Type': 'application/json',
      },
      method = METHOD.GET,
      data,
      timeout = 5000,
      withCredentials = true,
    } = options;  

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${HOST}${this.basePath}${url}${this.queryStringify(
            data as Record<string, string>,
          )}`
          : `${HOST}${this.basePath}${url}`,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.withCredentials = withCredentials;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }

  queryStringify(data: Record<string, string>) {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${encodeURIComponent(key)}=${encodeURIComponent(
        data[key],
      )}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
  }
}
