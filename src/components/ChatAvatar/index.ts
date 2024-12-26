import './style.pcss';
import Block from '../../framework/Block';

interface IChatAvatarProps {
  avatarSrc: string;
  avatarAlt: string;
  chatName: string;
}

export class ChatAvatar extends Block {
  constructor(props: IChatAvatarProps) {
    super({
      ...props,
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
