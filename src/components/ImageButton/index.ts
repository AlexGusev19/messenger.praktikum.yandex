import './style.pcss';
import Block from '../../framework/Block';

interface IImageButtonProps {
  imgSrc: string;
  imgAlt: string;
}

export class ImageButton extends Block {
  constructor(props: IImageButtonProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
    <button class="image-button">
        <img src="{{imgSrc}}" alt="{{imgAlt}}" />
    </button>`;
  }
}
