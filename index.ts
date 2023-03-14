import "./index.scss";
import {
  SignUpPage,
  SignInPage,
  ErrorPage,
  ProfilePage,
  ChangePasswordPage,
  ChatsPage,
} from "./src/pages";
import { Router } from "./src/services/router";
import Store from "./src/services/store";

declare global {
  interface Window {
    myAppStore: typeof Store;
  }
}

window.myAppStore = Store;

Router.use("/", SignInPage, {})
  .use("/sign-up", SignUpPage, {})
  .use("/settings", ProfilePage, {})
  .use("/messenger", ChatsPage, {})
  .use("/change-password", ChangePasswordPage, {})
  .use("/error", ErrorPage, {})
  .start();
