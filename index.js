import "./index.scss";
import signInPage from "./src/pages/signin/index.js";
import loginPage from "./src/pages/login/index.js";
import errorPage from "./src/pages/error/index.js";
import profilePage from "./src/pages/profile/index.js";
import chatPage from "./src/pages/chat/index.js";
import changePasswordPage from "./src/pages/change-password/index.js";

let routes = {};
let templates = {};

function route(path, template) {
  if (typeof template === "function") {
    return (routes[path] = template);
  } else if (typeof template === "string") {
    return (routes[path] = templates[template]);
  } else {
    return;
  }
}

function template(name, templateFunction) {
  return (templates[name] = templateFunction);
}

template("login", function () {
  loginPage();
});

template("sign-in", function () {
  signInPage();
});

template("error", function () {
  errorPage(404);
});

template("error500", function () {
  errorPage();
});

template("profile", function () {
  profilePage();
});

template("chat", function () {
  chatPage();
});

template("change-password", function () {
  changePasswordPage();
});

route("/", "login");
route("/sign-in", "sign-in");
route("/error", "error");
route("/error500", "error500");
route("/profile", "profile");
route("/chat", "chat");
route("/change-password", "change-password");

function resolveRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw new Error(`Route ${route} not found`);
  }
}

function router(evt) {
  let url = window.location.hash.slice(1) || "/";
  let route = resolveRoute(url);

  route();
}

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
