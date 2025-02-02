import { render } from '../utils/renderDOM';
import Block from './Block';

interface IRouteProps {
  rootQuery: string;
}

type Constructable<T = unknown> = new (...args: unknown[]) => T;

class Route {
  _pathname: string;

  _blockClass: Constructable;

  _block: Block | null;

  _props: IRouteProps;

  constructor(pathname: string, view: Constructable, props: IRouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return this.isEqual(pathname, this._pathname);
  }

  isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
  }

  render() {
    this._block = new this._blockClass() as Block;
    render(this._props.rootQuery, this._block);
  }
}

export class Router {
  static __instance: Router;

  routes: Route[];

  history: History;

  _currentRoute: Route | null;

  _rootQuery: string;

  root: HTMLElement;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: Constructable) {
    const route = new Route(pathname, block, {
      rootQuery: this._rootQuery,
    });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: Event) => {
      this._onRoute((event.currentTarget as typeof window)?.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  getCurrentPath() {
    return this._currentRoute?._pathname;
  }
}

export const router = new Router('app');
