import Block from '../../framework/Block';
import * as Components from '../../components';
import { chatController } from '../../controllers/chat-controller';
import { WebSocketTransport } from '../../api/WebSocket';
import { getTime } from '../ChatList';
import { ModalMode } from '../Modal';
import { store } from '../../framework/Store';

export interface IChatProps {
  chatID?: string;
  events?: Record<string, (...args: unknown[]) => void>;
}

export class Chat extends Block {
  _WebSocketInstance: WebSocketTransport;

  _chatID: string | undefined;

  constructor(props?: IChatProps) {
    super({
      ChatAvatar: new Components.ChatAvatar(),
      MenuButton: new Components.ImageButton({
        imgSrc: '/images/menu-chat.svg',
        imgAlt: 'chat menu',
      }),
      AddFileButton: new Components.ImageButton({
        imgSrc: '/images/add-file.svg',
        imgAlt: 'add file',
      }),
      SendInput: new Components.InputBase({
        className: 'chat__input',
        type: 'text',
        placeholder: 'Сообщение',
        name: 'message',
      }),
      SendButton: new Components.ImageButton({
        imgSrc: '/images/right-arrow-button.svg',
        imgAlt: 'send',
        events: {
          click: (event: Event) => {
            if (!this._chatID) return;

            const { form } = event.currentTarget as HTMLButtonElement;
            const input: Element | undefined = form?.elements[1];
            const value = (input as HTMLInputElement).value;

            if (value) {
              this._WebSocketInstance.sendMessage(value);
              form?.reset();
            }
          },
        },
      }),
      ChatMessages: [],
      AddUserToChatButton: new Components.Button({
        text: 'Добавить пользователя',
        className: 'dropdown-menu__button',
        events: {
          click: () => {
            if (!this._chatID) return;
            this.openModal(ModalMode.AddUserToChat);
          },
        },
      }),
      RemoveUserFromChatButton: new Components.Button({
        text: 'Удалить пользователя',
        className: 'dropdown-menu__button',
        events: {
          click: () => {
            if (!this._chatID) return;
            this.openModal(ModalMode.RemoveUserFromChat);
          },
        },
      }),
      ChatModal: new Components.Modal({ mode: ModalMode.AddUserToChat }),
    });

    this._chatID = props?.chatID;

    void this.connectToChat();
  }

  openModal = (mode: ModalMode) => {
    console.log({ chatID: this._chatID }, store.getState());
    this.setChildren({
      ChatModal: new Components.Modal({ mode, chatID: this._chatID }),
    });
    this.children.ChatModal.show();
  };

  async connectToChat() {
    if (!this._chatID) return;

    const { token, userId, chatId } = await chatController.getChatToken();
    this._WebSocketInstance = new WebSocketTransport(userId, chatId, token);

    this._WebSocketInstance.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      if (message.content) {
        const currentMessages = this.lists.ChatMessages;
        currentMessages.push(
          new Components.ChatOutcomeMessage({
            message: message.content,
            messageDate: getTime(message.time),
          }),
        );

        this.setLists({
          ChatMessages: currentMessages,
        });
      } else if (Array.isArray(message)) {
        this.setLists({
          ChatMessages: message.reverse().map(
            (item) =>
              new Components.ChatOutcomeMessage({
                message: item.content,
                messageDate: getTime(item.time),
              }),
          ),
        });
      }
    });
  }

  render() {
    return `
      <div class="chat__main__container">                    
        <div class="chat__main__container__header">                        
            {{{ChatAvatar}}}
            <div class="dropdown">
              <button class="dropdown__button">
                <img src="/images/menu-chat.svg" alt="chat menu" />
              </button>
              <div class="dropdown__content">
                {{{AddUserToChatButton}}}
                {{{RemoveUserFromChatButton}}}
              </div>
            </div>                       
        </div>

        <div class="chat__main__container__content">                                            
          {{{ChatMessages}}}                            
        </div>

        <div class="chat__main__container__footer">
            <form class="chat__main__container__control">
                {{{AddFileButton}}}
                {{{SendInput}}}
                {{{SendButton}}}
            </form>
        </div>  
            {{{ChatModal}}}             
        </div>             
      </div>`;
  }
}
