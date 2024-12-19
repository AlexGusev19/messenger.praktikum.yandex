import "./style.pcss";
import Block from "../../framework/Block";

export class Link extends Block {
  constructor(props) {
    console.log("Link", props);
    super({
        ...props,
    });
  }

  render() {
    return `
    <a href="#" class={{className}} data-page="{{dataPage}}">
        {{text}}
    </a>`;
  }
}
