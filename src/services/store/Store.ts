import EventBus from "../EventBus";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  static _instance: any;
  static STORE_NAME: string = "myAppStore";

  _state: { [key: string]: any } = {};

  constructor() {
    if (Store._instance) {
      return Store._instance;
    }

    super();

    const savedState = localStorage.getItem(Store.STORE_NAME);

    this._state = savedState ? JSON.parse(savedState) ?? {} : {};

    Store._instance = this;

    this.on(StoreEvents.Updated, () => {
      localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state));
    });
  }

  public getState() {
    return this._state;
  }

  public set(id: any, value: any) {
    this._state[id] = value;
    this.emit(StoreEvents.Updated);
    return this;
  }

  public removeState() {
    this._state = {};
    this.emit(StoreEvents.Updated);
  }

  public get(key: string) {
    return this._state[key];
  }
}

export default Store;
