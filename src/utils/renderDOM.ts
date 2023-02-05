function renderDOM(query: string, block: any): Element | null {
  const root = document.querySelector(query);

  root && root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}

export default renderDOM;
