import './style.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';

interface IUserProfileDataRow {
  changeMode?: boolean;
  rowName: string;
  rowData?: string;
  inputName?: string;
  inputType?: string;
  inputPlaceholder?: string;
  inputValue?: string;
}

export class UserProfileDataRow extends Block {
  constructor(props: IUserProfileDataRow) {
    super({
      ...props,
      input: new Components.InputBase({
        className: 'profile__input',
        type: props.inputType || '',
        placeholder: props.inputPlaceholder || '',
        name: props.inputName || '',
        value: props.inputValue || '',
      }),
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
            {{{input}}}
        </div>`;

    return row;
  }
}
