import "./style.pcss";;
import Block from "../../framework/Block";

export class ImageLink extends Block {
  constructor(props) {
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
