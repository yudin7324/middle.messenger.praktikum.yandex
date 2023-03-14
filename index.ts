import "./index.scss";
import {
  signUpPage,
  loginPage,
  errorPage,
  profilePage,
  changePasswordPage,
  chatsPage,
} from "./src/pages";
import { Router } from "./src/services/router";
import Store from "./src/services/store";

declare global {
  interface Window {
    myAppStore: typeof Store;
  }
}

window.myAppStore = Store;

Router.use("/", loginPage, {})
  .use("/sign-up", signUpPage, {})
  .use("/settings", profilePage, {})
  .use("/messenger", chatsPage, {})
  .use("/change-password", changePasswordPage, {})
  .use("/error", errorPage, {})
  .start();
