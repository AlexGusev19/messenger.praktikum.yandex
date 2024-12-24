import './style.pcss';
import Block from '../../framework/Block';

interface IImageLinkProps {
  dataPage: string;
  imgSrc: string;
  imgAlt: string;
}

export class ImageLink extends Block {
  constructor(props: IImageLinkProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <a href="#" class="image-link" data-page="{{dataPage}}">
            <img src="{{imgSrc}}" alt="{{imgAlt}}" />
        </a>`;
  }
}
