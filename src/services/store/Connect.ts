import Store from "./Store";
import Component from "../Component";
import { StoreEvents } from "./Store";

function connect(component: typeof Component, mapStateToProps: any) {
  return class extends component {
    constructor(tag: string, props: any = {}) {
      const store = new Store();
      super(tag, { ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };
}

export default connect;
