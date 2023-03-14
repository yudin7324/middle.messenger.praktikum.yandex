import { HttpClient } from "../utils";

const chatAPIInstance = new HttpClient(
  "https://ya-praktikum.tech/api/v2/chats"
);

class ChatAPI {
  public get() {
    const response = chatAPIInstance.get("");
    return response;
  }

  public create(data: { [key: string]: string }) {
    const headers = { "Content-Type": "application/json" };

    const response = chatAPIInstance.post("", data, headers);
    return response;
  }

  public initChat(userId: number, chatId: number, token: string) {
    const socket = chatAPIInstance.websocket(userId, chatId, token);

    return socket;
  }

  public delete(data: { [key: string]: number }) {
    const headers = { "Content-Type": "application/json" };
    const response = chatAPIInstance.delete("", data, headers);

    return response;
  }

  public addUsers(data: { [key: string]: number | any[] }) {
    const headers = { "Content-Type": "application/json" };
    const response = chatAPIInstance.put("/users", data, headers);

    return response;
  }

  public removeUsers(data: { [key: string]: any }) {
    const headers = { "Content-Type": "application/json" };
    const response = chatAPIInstance.delete("/users", data, headers);

    return response;
  }

  public getChatUsers(chatId: number) {
    const response = chatAPIInstance.get(`/${chatId}/users`);

    return response;
  }
}

export default new ChatAPI();
