import { Route } from "../router";

export type Props = Record<string, any>;

export interface RouteProps {
  navigate(pathname: string): void;
  leave(): void;
  match(pathname: string): void;
  render(): void;
}

class Router {
  private static __instance: Router | null;
  private routes: any;
  private history!: History;
  private _currentRoute: RouteProps | null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  use(pathname: string, block: any, props: Props) {
    const route = new Route(pathname, block, props);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: Event) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      this._onRoute("/error");

      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route: Route) => route.match(pathname));
  }
}

export default new Router();
