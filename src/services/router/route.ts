import { isEqual, render } from "../../utils";

export type Props = Record<string, any>;

class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: any;
  private _props: Props;

  constructor(pathname: string, view: string, props: Props) {
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
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
      render(this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
