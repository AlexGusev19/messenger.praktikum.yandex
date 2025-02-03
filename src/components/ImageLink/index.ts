import Block from '../../framework/Block';
import { router } from '../../framework/Router';

interface IImageLinkProps {
  href: string;
  imgSrc: string;
  imgAlt: string;
  events?: Record<string, (...args: unknown[]) => void>;
}

export class ImageLink extends Block {
  constructor(props: IImageLinkProps) {
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
        <a href="{{href}}" class="image-link">
            <img src="{{imgSrc}}" alt="{{imgAlt}}" />
        </a>`;
  }
}
