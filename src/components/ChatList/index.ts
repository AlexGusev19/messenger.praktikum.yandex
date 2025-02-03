import Block from '../../framework/Block';
import * as Components from '../../components';
import { store, StoreEvents } from '../../framework/Store';
import { chatController } from '../../controllers/chat-controller';

export const getTime = (date: string): string => {
  const currentDate = new Date(date);
  const currentHours = currentDate.getHours().toString();
  const currentMinutes = currentDate.getMinutes().toString();
  const hours =
    currentHours.length === 1 ? currentHours.padStart(1, '0') : currentHours;
  const minutes =
    currentMinutes.length === 1
      ? currentMinutes.padStart(1, '0')
      : currentMinutes;

  return `${hours}:${minutes}`;
};

interface IChatList {
  events?: Record<string, (...args: unknown[]) => void>;
}

export class ChatList extends Block {

  constructor(props?: IChatList) {
    super({
      ChatCardList: [],
    });    

    void chatController.getChatList();
    store.on(StoreEvents.Updated, () => {
      if (store.getState().chats)
        this.setLists({
          ChatCardList: store.getState().chats!.map(
            (chat) =>
              new Components.ChatCard({
                chatId: chat.id,
                chatName: chat.title,
                last: chat.last_message && getTime(chat.last_message.time),
                shortText: chat.last_message && chat.last_message.content,
                count: chat.unread_count,
                events: {
                  click: () => {
                    console.log({ chatID: chat.id });
                    void chatController.setCurrentChat(chat.id);
                    props?.events?.setChat({ chatID: chat.id, events: {
                      setModal: props.events.setModal,
                    } });
                  },
                },
              }),
          ),
        });
    });
  }

  render() {
    return `
        <div class="chat__left-side__chat-list">
          {{{ChatCardList}}}                  
        </div>
      `;
  }
}
