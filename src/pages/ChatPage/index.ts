import './chat.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';
import { PagesList } from '../../types/Pages';
import { ModalMode } from '../../components/Modal';
import { userLoginController } from '../../controllers/user-login-controller';
import { IChatProps } from '../../components/Chat';

export interface IChatPage {}

export class ChatPage extends Block {
  constructor(props: IChatPage) {
    super({
      ...props,
      ProfileLink: new Components.Link({
        href: PagesList.profile,
        text: 'Профиль >',
        className: 'profile-link',
      }),
      AddChatButton: new Components.Button({
        text: 'Добавить чат',
        events: {
          click: () => {
            this.children.Modal.show();
          },
        },
      }),
      SearchInput: new Components.Input({
        className: 'chat__left-side__search__control',
        type: 'search',
        placeholder: 'Поиск',
        name: 'search',
      }),
      Modal: new Components.Modal({ mode: ModalMode.AddChat }),
      ChatList: new Components.ChatList(),
      Chat: new Components.Chat(),
    });

    void userLoginController.getUserData();
  }

  componentDidMount() {
    this.setChildren({
      ChatList: new Components.ChatList({
        events: {
          setChat: this.setChat,
        },
      }),
    });

    this.setChildren({
      Chat: new Components.Chat({
        events: {
          setModal: this.setModal,
        },
      }),
    });
  }

  setChat = (props: IChatProps) => {
    this.setChildren({
      Chat: new Components.Chat({ ...props }),
    });
  };

  setModal = (mode: ModalMode) => {
    this.setChildren({
      Modal: new Components.Modal({ mode }),
    });
    this.children.Modal.show();
  };

  render() {
    return `<main class="container">   
                <div class="chat__left-side">
                    <div class="chat__left-side__header">
                      {{{ProfileLink}}}
                    </div>
                    <div class="chat__left-side__add-chat">
                      {{{AddChatButton}}}
                    </div>                    
                    <div class="chat__left-side__search">
                    {{{SearchInput}}}
                    </div>
                    <div class="chat__left-side__footer">               
                      {{{ChatList}}}                 
                    </div>
                </div>
                <div class="chat__main">
                  {{{Chat}}}   
                </div>
                  {{{Modal}}}         
                </main>
                `;
  }
}
