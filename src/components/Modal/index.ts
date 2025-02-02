import Block from '../../framework/Block';
import * as Components from '../../components/';
import './style.pcss';
import { userDataController } from '../../controllers/user-data-controller';
import { getFormDataToConsole } from '../../utils/getFormDataToConsole';
import { chatController } from '../../controllers/chat-controller';
import { ISearchUser } from '../../api/user-api';
import { ICreateChat } from '../../api/chat-api';

export enum ModalMode {
  AddUserAvatar = 'addUserAvatar',
  AddChat = 'addChat',
  AddUserToChat = 'addUserToChat',
  RemoveUserFromChat = 'removeUserFromChat',
}

interface IModalProps {
  mode: ModalMode;
}

const componentPropsByMode = (mode: ModalMode) => {
  if (mode === ModalMode.AddUserAvatar) {
    return {
      title: 'Загрузите файл',
      input: {
        type: 'file',
        name: 'avatar',
        accept: 'image/*',
      },
      button: {
        text: 'Поменять',
      },
    };
  } else if (mode === ModalMode.AddChat) {
    return {
      title: 'Добавить чат',
      input: {
        type: 'text',
        name: 'title',
        placeholder: 'Название чата',
        className: 'modal__input',
      },
      button: {
        text: 'Добавить',
      },
    };
  } else if (mode === ModalMode.AddUserToChat) {
    return {
      title: 'Добавить пользователя в чат',
      input: {
        type: 'text',
        name: 'login',
        placeholder: 'Логин',
        className: 'modal__input',
      },
      button: {
        text: 'Добавить',
      },
    };
  } else if (mode === ModalMode.RemoveUserFromChat) {
    return {
      title: 'Удалить пользователя из чата',
      input: {
        type: 'text',
        name: 'login',
        placeholder: 'Логин',
        className: 'modal__input',
      },
      button: {
        text: 'Удалить',
      },
    };
  }
};

export class Modal extends Block {
  constructor(props: IModalProps) {
    const { mode } = props;
    const { title, input, button } = componentPropsByMode(mode)!;

    super({
      title,
      inputField: new Components.InputBase({ ...input }),
      addAvatarButton: new Components.Button({
        text: button.text,
        events: {
          click: (event: Event) => {
            const { form } = event.currentTarget as HTMLButtonElement;
            const data = new FormData(form!);
            console.log({ data });

            if (props.mode === ModalMode.AddUserAvatar) {
              void userDataController.updateUserAvatar(data);
            } else if (props.mode === ModalMode.AddChat) {
              void chatController.createChat(
                getFormDataToConsole(form!) as unknown as ICreateChat,
              );
            } else if (props.mode === ModalMode.AddUserToChat) {
              void chatController.addUserForChat(
                getFormDataToConsole(form!) as unknown as ISearchUser,
              );
            } else if (props.mode === ModalMode.RemoveUserFromChat) {
              void chatController.removeUserForChat(
                getFormDataToConsole(form!) as unknown as ISearchUser,
              );
            }
            
          },
        },
      }),
      events: {
        click: (event: Event) => {
          if (event.target === this._element?.firstElementChild) this.hide();
        },
      },
    });
  }

  render() {
    return `
        <div class="modal">
            <div class="modal__container">
            <div class="modal__content">
                <div class="modal__content__title">
                {{title}}
                </div>                  
                <form>
                    <div class="modal__content__field">
                        {{{inputField}}}
                    </div>
                    {{{addAvatarButton}}}
                </form>
            </div>                 
            </div>
        </div>`;
  }
}
