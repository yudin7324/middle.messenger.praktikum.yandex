const render = (block: { getContent: () => HTMLElement }) => {
  const root = document.querySelector("#root") as HTMLElement;
  root.innerHTML = "";
  root.appendChild(block.getContent());
  return root;
};

export default render;
