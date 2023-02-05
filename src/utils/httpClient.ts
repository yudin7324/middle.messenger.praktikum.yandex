class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private createXHR(
    method: string,
    url: string,
    body?: any
  ): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => resolve(xhr);
      xhr.onerror = () => reject(xhr);
      if (body) {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send();
      }
    });
  }

  public async get(path: string, params?: any): Promise<any> {
    const queryString = params ? this.buildQueryString(params) : "";
    const url = `${this.baseUrl}${path}${queryString}`;
    const xhr = await this.createXHR("GET", url);
    return JSON.parse(xhr.responseText);
  }

  public async post(path: string, body: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const xhr = await this.createXHR("POST", url, body);
    return JSON.parse(xhr.responseText);
  }

  public async put(path: string, body: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const xhr = await this.createXHR("PUT", url, body);
    return JSON.parse(xhr.responseText);
  }

  public async delete(path: string): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    const xhr = await this.createXHR("DELETE", url);
    return JSON.parse(xhr.responseText);
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
