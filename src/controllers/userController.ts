import { Router } from "../services/router";
import { AuthAPI, ChatAPI, UserAPI } from "../api";
import { validateFormFields } from "../utils";
import { loginValidationRules } from "../constants";
import Store from "../services/store";

class UserController {
  public async getUser() {
    const response = AuthAPI.getUser();
    const chats = ChatAPI.get();

    response.then((data) => {
      if (data) {
        Store.set("user", JSON.parse(data));
        Store.set("isAuth", true);
        Router.go("/messenger");
      }
      if (Array.isArray(chats)) {
        Store.set("chats", chats);
      }
    });
  }

  public async logout() {
    const response = AuthAPI.logout();

    response.then((data) => {
      if (data === "OK") {
        Store.removeState();
        Router.go("/");
      }
    });
  }

  public async login(target: HTMLFormElement, formValues: any) {
    const validationResult = validateFormFields(
      loginValidationRules,
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
      const response = AuthAPI.signIn(formValues);

      response.then((data) => {
        if (data === "OK") {
          this.getUser();
        } else {
          const error = JSON.parse(data);

          target.querySelectorAll(".field__input").forEach((input) => {
            if (input !== null) {
              input.classList.add("field__input_invalid");

              if (input.nextElementSibling !== null) {
                switch (error.reason) {
                  case "Login or password is incorrect":
                    return (input.nextElementSibling.innerHTML =
                      "Неверный логин или пароль");

                  default:
                    return (input.nextElementSibling.innerHTML =
                      "Что то пошло не так");
                }
              }
            }
          });
        }
      });
    }
  }

  public async searchUser(data: { [key: string]: string }) {
    const response = UserAPI.searchUser(data);

    response.then((data) => {
      const users = JSON.parse(data);
      if (Array.isArray(users)) {
        Store.set("search_users", users);
      }
    });
  }
}

export default new UserController();
