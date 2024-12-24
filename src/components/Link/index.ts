import Block from '../../framework/Block';

interface ILinkProps {
  className?: string;
  text: string;
  dataPage: string;
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: () => console.log('click'),
      },
    });
  }

  render() {
    return `
    <a href="#" class={{className}} data-page="{{dataPage}}">
        {{text}}
    </a>`;
  }
}