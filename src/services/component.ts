import EventBus from "./eventBus";
import { v4 as uuid } from "uuid";
import Handlebars from "handlebars";

interface Props {
  [key: string]: string | Function;
}

interface Meta {
  tagName: string;
  props: Props;
}

interface Children {
  [key: string]: Component<any> | string | Function;
}

class Component<T = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _props: T | any;
  _children: Children;
  _id: string;
  _element: HTMLElement;
  _meta: Meta | null = null;
  _setUpdate: boolean = false;
  _eventBus: any;

  constructor(tagName: string = "div", propsAndChildren = {}) {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._children = this._makePropsProxy(children);
    this._id = uuid();
    this._props = this._makePropsProxy({ ...props, __id: this._id });
    this._meta = {
      tagName,
      props,
    };
    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Component.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: Props & Children): {
    children: Children;
    props: Props;
  } {
    const children: Children = {};
    const props: Props = {};

    Object.keys(propsAndChildren).forEach((key: string) => {
      if (propsAndChildren[key] instanceof Component) {
        children[key] = propsAndChildren[key];
      } else {
        props[key] = propsAndChildren[key];
      }
    });

    return { children, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }
  }

  init() {
    this._createResources();
    this._eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();
    this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps?: { events?: () => void; attr?: string }) {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length)
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  _componentDidUpdate(
    oldProps: { events?: (() => void) | undefined; attr?: string | undefined },
    newProps: { events?: (() => void) | undefined; attr?: string | undefined }
  ) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);

    if (isReRender) {
      this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(
    oldProps: { events?: () => void; attr?: string },
    newProps: { events?: () => void; attr?: string }
  ) {
    return true;
  }

  setProps = (nextProps: Props & Children) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this._props };

    const { children, props } = this._getChildren(nextProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (!this._setUpdate) {
      this._eventBus().emit(Component.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = true;
    }
  };

  get element() {
    return this._element;
  }

  render() {
    const fragment = document.createDocumentFragment();

    return fragment;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = "";
    this._element.appendChild(block);
    this.addEvents();
    this.addAttribute();
  }

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName: string) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName: string) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  addAttribute() {
    const { attr = {} } = this._props;

    Object.entries(attr).forEach(([key, value]: [any, string]) => {
      this._element.setAttribute(key, value);
    });
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Children) {
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: { [key: string]: string }, prop: string, value: string) {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  compile(template: string, props?: Props): DocumentFragment {
    if (typeof props == "undefined") {
      props = this._props;
    }

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(
      ([key, child]: [key: string, child: Component]) => {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    );

    const fragment = document.createElement("template");
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child: Component) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  show() {
    this.getContent().style.display = "flex";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Component;
