import './style.pcss';
import Block from '../../framework/Block';

interface IButtonProps {
  text: string;
  dataPage: string;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
    <button class="button" data-page="{{dataPage}}">
        {{text}}
    </button>`;
  }
}
