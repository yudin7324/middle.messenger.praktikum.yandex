import { HttpClient } from "../utils";
import { LoginRequest } from "types/signin";
import { SignupRequest } from "types/signup";

const authAPIInstance = new HttpClient("https://ya-praktikum.tech/api/v2/auth");

class AuthAPI {
  public signIn(user: LoginRequest) {
    const headers = { "Content-Type": "application/json" };
    const response = authAPIInstance.post("/signin", user, headers);
    return response;
  }

  public getUser() {
    const headers = { "Content-Type": "application/json" };
    const response = authAPIInstance.get("/user", headers);
    return response;
  }

  public logout() {
    const response = authAPIInstance.post("/logout");
    return response;
  }

  public signUp(user: SignupRequest) {
    const headers = { "Content-Type": "application/json" };
    const response = authAPIInstance.post("/signup", user, headers);
    return response;
  }
}

export default new AuthAPI();
