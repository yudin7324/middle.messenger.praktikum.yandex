import { HttpClient } from "../utils";

const tokenAPIInstance = new HttpClient();

class TokenAPI {
  public get(chatId: number) {
    const headers = { "Content-Type": "application/json" };
    const response = tokenAPIInstance.post(`/chats/token/${chatId}`, headers);
    return response;
  }
}

export default new TokenAPI();
