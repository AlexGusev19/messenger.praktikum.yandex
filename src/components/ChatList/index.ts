import Block from '../../framework/Block';
import * as Components from '../../components';
import { store, StoreEvents } from '../../framework/Store';

export class ChatList extends Block {
  constructor() {
    super({
      ChatCardList: [],
    });

    store.on(StoreEvents.Updated, () => {
      console.log('ChatList', store.getState().chats);
      if (store.getState().chats) this.setLists({
        ChatCardList: store.getState().chats.map(
          (chat) =>
            new Components.ChatCard({
              chatId: chat.id,
              chatName: chat.title,
              last: this.getTime(chat.last_message.time),
              shortText: chat.last_message.content,
              count: chat.unread_count,
              events: {
                click: () => {
                  console.log('click ChatList');
                },
              },
            }),
        ),
      });
    });
  }

  getTime = (date: string): string => {
    const currentDate = new Date(date);
  
    return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
  };

  render() {
    return `
        <div class="chat__left-side__chat-list">
          {{{ChatCardList}}}                  
        </div>
      `;
  }
  
}
