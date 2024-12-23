import "./style.pcss";
import Block from "../../framework/Block";

export class ChatAvatar extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render() {
    return `
    <div class="chat__avatar">
        <img src="{{avatarSrc}}" alt="{{avatarAlt}}" />
        <span>{{chatName}}</span>
    </div>`;
  }
}
