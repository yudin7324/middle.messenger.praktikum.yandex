import { expect } from "chai";
import HttpClient from "./httpClient";
import FakeXMLHTTPRequests from "fake-xml-http-request";

const APIInstance = new HttpClient();
const requests: any[] = [];

(global as any).XMLHttpRequest = function () {
  const r = new FakeXMLHTTPRequests();
  requests.push(r);
  return r;
};

describe("HttpTransport", () => {
  it("should be a proper url", () => {
    APIInstance.get("/chats");

    const request = requests[0];

    expect(request.url).to.eq("https://ya-praktikum.tech/api/v2/chats");
  });

  it("should be a proper method", () => {
    APIInstance.put("/chats", {});

    const request = requests[1];

    expect(request.method).to.eq("PUT");
  });
});
