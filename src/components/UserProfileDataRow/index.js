import "./style.pcss";;
import Block from "../../framework/Block";

export class UserProfileDataRow extends Block {
  constructor(props) {
    super({
      ...props,
    });
  }

  render() {
    const row = !this.props.changeMode
      ? `<div class="profile__row">
            <span>{{rowName}}</span>
            <span class="profile__row__data">{{rowData}}</span>
        </div>`
      : `<div class="profile__row">
            <span>{{rowName}}</span>
            <span class="error-message-row" data-for={{inputName}}>Ошибка валидации</span>
            <input
              class="profile__input"
              type="{{inputType}}"
              name="{{inputName}}"
              placeholder="{{inputPlaceholder}}"
            />
        </div>`;
        
    return row;
  }
}
