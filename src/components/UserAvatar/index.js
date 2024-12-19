import "./style.pcss";
import Block from "../../framework/Block";

export class UserAvatar extends Block {
  constructor(props) {
    console.log("UserAvatar", props);
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class="user__avatar__container">
            <div class="user__avatar">
                <img class="user__avatar" src="{{imgSrc}}" alt="{{imgAlt}}" />
                <h1 class="user__avatar__title">{{userName}}</h1>
            </div>
        </div>`;
  }
}
