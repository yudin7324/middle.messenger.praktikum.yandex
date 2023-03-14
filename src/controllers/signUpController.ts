import { Router } from "../services/router";
import { AuthAPI } from "../api";
import { validateFormFields } from "../utils";
import { signUpValidationRules } from "../constants";

class SignUpController {
  public async signUp(target: HTMLFormElement, formValues: any) {
    const validationResult = validateFormFields(
      signUpValidationRules,
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
      const response = AuthAPI.signUp(formValues);

      response.then((data) => {
        const res = JSON.parse(data);

        if (res.id) {
          Router.go("/");
        } else {
          target.querySelectorAll(".field__input").forEach((input) => {
            if (input !== null) {
              input.classList.add("field__input_invalid");
              if (input.nextElementSibling !== null) {
                input.nextElementSibling.innerHTML = "Что то пошло не так";
              }
            }
          });
        }
      });
    }
  }
}

export default SignUpController;
