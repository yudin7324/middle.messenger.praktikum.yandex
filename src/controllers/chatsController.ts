import { ChatAPI, TokenAPI } from "../api";
import Store from "../services/store";
import { validateFormFields } from "../utils";
import { addChatValidationRules } from "../constants";

class ChatsController {
  public async getToken(chatId: number) {
    try {
      const response = TokenAPI.get(chatId);

      return response
        .then((response) => JSON.parse(response))
        .then((data) => data.token);
    } catch (error) {
      console.log(error);
    }
  }

  public async getMessages(chatId: number) {
    try {
      const state = Store.getState();
      const userId = state.user.id;
      const token = state.chats.find((chat: any) => chat.id === chatId).token;
      const socket = ChatAPI.initChat(userId, chatId, token);

      socket.addEventListener("open", () => {
        socket.send(
          JSON.stringify({
            content: "0",
            type: "get old",
          })
        );
      });

      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data).sort(
          (prev: any, next: any) =>
            new Date(prev.time).getTime() - new Date(next.time).getTime()
        );

        Store.set("messages", data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendMessage(message: string) {
    try {
      const state = Store.getState();
      const chatId = state.currentChat.id;
      const userId = state.user.id;
      const token = state.chats.find((chat: any) => chat.id === chatId).token;

      const socket = ChatAPI.initChat(userId, chatId, token);

      socket.addEventListener("open", () => {
        socket.send(
          JSON.stringify({
            content: message,
            type: "message",
          })
        );
      });

      socket.addEventListener("message", (event: any) => {
        const messages = Store.get("messages");

        if (Array.isArray(JSON.parse(event.data))) {
          const data = JSON.parse(event.data).sort(
            (prev: any, next: any) =>
              new Date(prev.time).getTime() - new Date(next.time).getTime()
          );

          Store.set("messages", data);
        } else {
          Store.set("messages", [...messages, JSON.parse(event.data)]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getChats() {
    try {
      const response = ChatAPI.get();

      response.then(async (data) => {
        const chats = JSON.parse(data);

        const chatsWithToken = [];

        for (const chat of chats) {
          const token = await this.getToken(chat.id);

          chatsWithToken.push({
            id: chat.id,
            title: chat.title,
            avatar: chat.avatar,
            token,
          });
        }

        Store.set("chats", chatsWithToken);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async addChat(
    target: HTMLFormElement,
    formValues: { [key: string]: string }
  ) {
    try {
      const validationResult = validateFormFields(
        addChatValidationRules,
        formValues
      );

      const hasErrors = Object.values(validationResult).some(
        (error) => error !== null
      );

      if (hasErrors) {
        target.querySelectorAll(".field__input").forEach((input) => {
          for (const fieldName in validationResult) {
            const errorMessage = validationResult[fieldName];
            if (
              errorMessage !== null &&
              input !== null &&
              input.nextElementSibling !== null &&
              input.getAttribute("name") === fieldName
            ) {
              input.classList.add("field__input_invalid");
              input.nextElementSibling.innerHTML = errorMessage;
            }
          }
        });
      } else {
        const response = ChatAPI.create(formValues);

        response.then((data) => {
          const chatId = JSON.parse(data);
          if (chatId.id) {
            const res = ChatAPI.get();
            res.then((data) => {
              const chats = JSON.parse(data);
              if (Array.isArray(chats)) {
                Store.set("chats", chats);
              }
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteChat(chatId: number) {
    try {
      const response = ChatAPI.delete({ chatId: Number(chatId) });

      response.then((data) => {
        const chat = JSON.parse(data);
        if (chat.result.id) {
          this.getChats();
          Store.set("currentChat", null);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async addUsers(userId: string) {
    try {
      const state = Store.getState();
      const chatId = state.currentChat.id;
      const users = [userId];
      const response = ChatAPI.addUsers({ chatId, users });

      response.then((data) => {
        if (data.toLowerCase() === "ok") {
          this.getChats();
          Store.set("search_users", []);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getChatUsers() {
    try {
      const state = Store.getState();
      const chatId = state.currentChat.id;
      const response = ChatAPI.getChatUsers(chatId);

      response.then((data) => {
        const users = JSON.parse(data);
        if (Array.isArray(users)) {
          Store.set("chat_users", users);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteChatUser(userId: string) {
    try {
      const state = Store.getState();
      const chatId = state.currentChat.id;
      const users = [userId];
      const response = ChatAPI.removeUsers({ chatId, users });

      response.then((data) => {
        if (data.toLowerCase() === "ok") {
          this.getChatUsers();
          Store.set("chat_users", data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ChatsController();
