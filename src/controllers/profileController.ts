import { UserAPI } from "../api";
import { validateFormFields } from "../utils";
import { profileValidationRules, passwordValidationRules } from "../constants";
import { Router } from "../services/router";
import Store from "../services/store";

class ProfileController {
  public async changeAvatar(file: FormData) {
    const response = UserAPI.changeAvatar(file);

    response.then((data) => {
      const user = JSON.parse(data);
      if (user.id) {
        Store.set("user", JSON.parse(data));
      }
    });
  }

  public async changePassword(target: HTMLFormElement, formValues: any) {
    const validationResult = validateFormFields(
      passwordValidationRules,
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
      const response = UserAPI.changePassword(formValues);

      response.then((data) => {
        if (data === "OK") {
          Router.go("/settings");
        } else {
          const error = JSON.parse(data);

          target.querySelectorAll(".field__input").forEach((input) => {
            if (input !== null) {
              input.classList.add("field__input_invalid");

              if (input.nextElementSibling !== null) {
                switch (error.reason) {
                  case "Password is incorrect":
                    return (input.nextElementSibling.innerHTML =
                      "Неверный пароль");

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

  public async change(target: HTMLFormElement, formValues: any) {
    const validationResult = validateFormFields(
      profileValidationRules,
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
      const response = UserAPI.changeUserProfile(formValues);

      response.then((data) => {
        if (data) {
          Store.set("user", JSON.parse(data));
        }
      });
    }
  }
}

export default new ProfileController();
