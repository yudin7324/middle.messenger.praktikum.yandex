import "./index.scss";
import {
  signUpPage,
  signInPage,
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

Router.use("/", signInPage, {})
  .use("/sign-up", signUpPage, {})
  .use("/settings", profilePage, {})
  .use("/messenger", chatsPage, {})
  .use("/change-password", changePasswordPage, {})
  .use("/error", errorPage, {})
  .start();
