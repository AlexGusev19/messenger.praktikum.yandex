enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface IOptions {
  method: METHOD;
  headers?: Record<string, string>;
  data?: Record<string, string>;
  timeout?: number;
}

class HTTPTransport {
  get(url: string, options: IOptions): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout,
    );
  }

  put(url: string, options: IOptions): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
      options.timeout,
    );
  }

  post(url: string, options: IOptions): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
      options.timeout,
    );
  }

  delete(url: string, options: IOptions): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options.timeout,
    );
  }

  request(
    url: string,
    options: IOptions,
    timeout = 5000,
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && !!data ? `${url}${this.queryStringify(data)}` : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
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
      return `${result}${key}=${data[key]}${
        index < keys.length - 1 ? '&' : ''
      }`;
    }, '?');
  }
}

export const api = new HTTPTransport();
