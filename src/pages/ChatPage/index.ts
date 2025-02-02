import './chat.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';
import { store } from '../../framework/Store';
import { PagesList } from '../../types/Pages';
import { ModalMode } from '../../components/Modal';
import { chatController } from '../../controllers/chat-controller';

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

    void chatController
      .getChatList()
      .then((resp) => console.log('getChatList', resp));
    void chatController.getUsersForChat('46137');

    void chatController.getChatToken('46137');

    console.log({ store });
  }

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
                  {{{Modal}}}             
                </main>
                `;
  }
}
