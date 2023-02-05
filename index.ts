import "./index.scss";
import {
  signInPage,
  loginPage,
  errorPage,
  profilePage,
  changePasswordPage,
  chatsPage,
  manePage,
} from "./src/pages";
import mainPage from "./src/pages/main";

import { renderDOM } from "./src/utils";

let routes = {};
let templates = {};

function route(path: string, template: string) {
  if (typeof template === "function") {
    return (routes[path] = template);
  } else if (typeof template === "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
}

function template(
  name: string,
  templateFunction: {
    (): void;
  }
) {
  return (templates[name] = templateFunction);
}

template("main", function () {
  renderDOM("#root", mainPage);
});

template("login", function () {
  renderDOM("#root", loginPage);
});

template("sign-in", function () {
  renderDOM("#root", signInPage);
});

template("error", function () {
  renderDOM("#root", errorPage);
});

template("profile", function () {
  renderDOM("#root", profilePage);
});

template("chat", function () {
  renderDOM("#root", chatsPage);
});

template("change-password", function () {
  renderDOM("#root", changePasswordPage);
});

route("/", "main");
route("/login", "login");
route("/sign-in", "sign-in");
route("/error", "error");
route("/profile", "profile");
route("/chat", "chat");
route("/change-password", "change-password");

function resolveRoute(route: string) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router() {
  let url = window.location.pathname || "/";
  let route = resolveRoute(url);
  route();
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
