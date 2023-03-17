import { HttpClient } from "../utils";
import { LoginRequest } from "types/signin";
import { SignupRequest } from "types/signup";

const authAPIInstance = new HttpClient();

class AuthAPI {
  public signIn(user: LoginRequest) {
    const headers = { "Content-Type": "application/json" };
    const response = authAPIInstance.post("/auth/signin", user, headers);
    return response;
  }

  public getUser() {
    const headers = { "Content-Type": "application/json" };
    const response = authAPIInstance.get("/auth/user", headers);
    return response;
  }

  public logout() {
    const response = authAPIInstance.post("/auth/logout");
    return response;
  }

  public signUp(user: SignupRequest) {
    const headers = { "Content-Type": "application/json" };
    const response = authAPIInstance.post("/auth/signup", user, headers);
    return response;
  }
}

export default new AuthAPI();
