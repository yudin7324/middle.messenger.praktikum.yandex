import tpl from "./tpl";
import { Component } from "../../../../services";

type SearchFormType = {};

class SearchForm extends Component<SearchFormType> {
  render(): DocumentFragment {
    const fragment: DocumentFragment = this.compile(tpl);

    return fragment;
  }
}

export default SearchForm;
