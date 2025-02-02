import './style.pcss';
import Block from '../../framework/Block';
import { store, StoreEvents } from '../../framework/Store';

export class ChatAvatar extends Block {
  constructor() {
    super({
      avatarSrc: '/images/user-blank-avatar.svg',
      avatarAlt: 'chat avatar',
    });

    store.on(StoreEvents.Updated, () => {
      const { currentChat } = store.getState();
      if (currentChat) this.setProps({
        chatName: currentChat.title,
      });
    });
  }

  render() {
    return `
    <div class="chat__avatar">
        <img src="{{avatarSrc}}" alt="{{avatarAlt}}" />
        <span>{{chatName}}</span>
    </div>`;
  }
}
