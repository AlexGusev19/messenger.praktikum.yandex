import "./style.pcss";;
import Block from "../../framework/Block";

export class UserProfileDataRow extends Block {
  constructor(props) {
    console.log("UserProfileDataRow", props);
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class="profile__row">
            <span>{{rowName}}</span>
            <span class="profile__row__data">{{rowData}}</span>
        </div>`;
  }
}
