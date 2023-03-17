import { HttpClient } from "../utils";

const chatAPIInstance = new HttpClient();

class ChatAPI {
  public get() {
    const response = chatAPIInstance.get("/chats");
    return response;
  }

  public create(data: { [key: string]: string }) {
    const headers = { "Content-Type": "application/json" };

    const response = chatAPIInstance.post("/chats", data, headers);
    return response;
  }

  public initChat(userId: number, chatId: number, token: string) {
    const socket = chatAPIInstance.websocket(userId, chatId, token);

    return socket;
  }

  public delete(data: { [key: string]: number }) {
    const headers = { "Content-Type": "application/json" };
    const response = chatAPIInstance.delete("/chats", data, headers);

    return response;
  }

  public addUsers(data: { [key: string]: number | any[] }) {
    const headers = { "Content-Type": "application/json" };
    const response = chatAPIInstance.put("/chats/users", data, headers);

    return response;
  }

  public removeUsers(data: { [key: string]: any }) {
    const headers = { "Content-Type": "application/json" };
    const response = chatAPIInstance.delete("/chats/users", data, headers);

    return response;
  }

  public getChatUsers(chatId: number) {
    const response = chatAPIInstance.get(`/chats/${chatId}/users`);

    return response;
  }
}

export default new ChatAPI();
