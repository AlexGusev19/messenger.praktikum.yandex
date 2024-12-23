import "./style.pcss";
import Block from "../../framework/Block";

export class ImageButton extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render() {
    return `
    <button id="{{idButton}}" class="image-button">
        <img src="{{imgSrc}}" alt="{{imgAlt}}" />
    </button>`;
  }
}
