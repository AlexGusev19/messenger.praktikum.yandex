import "./style.pcss";
import Block from "../../framework/Block";

export class Button extends Block {
  constructor(props) {
    console.log("Button", props);
    super({
        ...props,
    });
  }

  render() {
    return `
    <button id="{{idButton}}" class="button" data-page="{{dataPage}}">
        {{text}}
    </button>`;
  }
}
