import './style.pcss';
import Block from '../../framework/Block';

interface IUserAvatarProps {
  imgSrc: string;
  imgAlt: string;
  userName?: string;
}

export class UserAvatar extends Block {
  constructor(props: IUserAvatarProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
        <div class="user__avatar__container">
            <div class="user__avatar">
                <img class="user__avatar" src="{{imgSrc}}" alt="{{imgAlt}}" />
                <h1 class="user__avatar__title">{{userName}}</h1>
            </div>
        </div>`;
  }
}
