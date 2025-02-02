import Block from '../../framework/Block';
import { router } from '../../framework/Router';

interface ILinkProps {
  href: string;
  className?: string;
  text: string;
  events?: Record<string, (...args: unknown[]) => void>;
}

export class Link extends Block {
  constructor(props: ILinkProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          props.events?.click();
          router.go(props.href);          
        },
      },
    });
  }

  render() {
    return `
    <a href="{{href}}" class={{className}}>
        {{text}}
    </a>`;
  }
}
