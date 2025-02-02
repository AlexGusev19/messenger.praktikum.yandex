import './style.pcss';
import Block from '../../framework/Block';

interface IImageButtonProps {
  imgSrc: string;
  imgAlt: string;
  events?: Record<string, (...args: unknown[]) => void>;
}

export class ImageButton extends Block {
  constructor(props: IImageButtonProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          props.events?.click(event);
        },
      },
    });
  }

  render() {
    return `
      <button class="image-button">
          <img src="{{imgSrc}}" alt="{{imgAlt}}" />
      </button>`;
  }
}
