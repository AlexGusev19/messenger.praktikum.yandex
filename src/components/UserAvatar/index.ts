import './style.pcss';
import Block from '../../framework/Block';
import { store, StoreEvents } from '../../framework/Store';
import { HOST } from '../../api/HTTP';

interface IUserAvatarProps {
  callBack?: () => void,
}

export class UserAvatar extends Block {
  constructor(props: IUserAvatarProps) {
    console.log({ store });
    super({
      imgAlt: 'user avatar',
      imgSrc: '/images/user-avatar.svg',
      events: {
        click: () => {
          props.callBack?.();
          console.log('click', { c: this });
        },
      },
    });

    store.on(StoreEvents.Updated, () => {
      const { user } = store.getState();
      if (user && user.avatar)
        this.setProps({
          imgSrc: `${HOST}/api/v2/resources/${user.avatar}`,
        });
    });
  }

  render() {
    return `
          <div class="user__avatar">
            <img class="user__avatar__img" src="{{imgSrc}}" alt="{{imgAlt}}" />
            <div class="user__avatar__change">Поменять аватар</div>
          </div>`;
  }
}
