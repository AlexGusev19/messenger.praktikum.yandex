import Block from '../framework/Block';

export function render(query: string, block: Block | null) {
  const root = document.getElementById(query);
  if (root?.firstChild) root?.firstChild.remove();

  if (block) root?.append(block?.getContent());
  block?._componentDidMount();
  return root;
}
