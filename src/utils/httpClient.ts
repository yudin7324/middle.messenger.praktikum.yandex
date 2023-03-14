class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private createXHR(
    method: string,
    url: string,
    body?: any,
    headers?: any
  ): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.withCredentials = true;
      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      if (headers && headers["Content-Type"]) {
        xhr.setRequestHeader("Content-Type", headers["Content-Type"]);
      }

      if (body) {
        if (!headers || headers["Content-Type"] === "multipart/form-data") {
          xhr.send(body);
        } else {
          xhr.send(JSON.stringify(body));
        }
      } else {
        xhr.send();
      }
    });
  }

  public async get(path: string, params?: any, headers?: any): Promise<any> {
    const queryString = params ? this.buildQueryString(params) : "";
    const url = `${this.baseUrl}${path}${queryString}`;
    const xhr = await this.createXHR("GET", url, null, headers);
    const response = xhr.responseText;
    return response;
  }

  public async post(path: string, body?: any, headers?: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const xhr = await this.createXHR("POST", url, body, headers);
    const response = xhr.responseText;
    return response;
  }

  public async put(path: string, body: any, headers?: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const xhr = await this.createXHR("PUT", url, body, headers);
    const response = xhr.responseText;
    return response;
  }

  public async delete(path?: string, body?: any, headers?: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const xhr = await this.createXHR("DELETE", url, body, headers);
    const response = xhr.responseText;
    return response;
  }

  public websocket(userId: number, chatId: number, token: string): WebSocket {
    const url = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
    const socket = new WebSocket(url);

    return socket;
  }

  private buildQueryString(params: any): string {
    return (
      "?" +
      Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&")
    );
  }
}

export default HttpClient;
