import Block from '../../framework/Block';

export interface IChatCard {
  chatName: string;
  last?: string;
  shortText?: string;
  count?: string;
  chatId?: string;
  events?: Record<string, (...args: unknown[]) => void>;
}

export class ChatCard extends Block {
  chatId: string;

  constructor(props: IChatCard) {
    super({
      ...props,
      events: {
        click: () => {
          props.events?.click();
        },
      },
    });
    this.chatId = props.chatId!;
  }

  render() {
    const badgeCount = this.props.count
      ? `<div class="chat-card__badge">
              <div class="badge">{{count}}</div>
          </div>`
      : '';

    const last = this.props.last
      ? '<span class="chat-card__date">{{last}}</span>'
      : '';

    const shortText = this.props.shortText
      ? `<div class="chat-card__short-text">
              {{shortText}}
          </div>`
      : '';

    return `
    <div class="chat-card">
      <img src="/images/chat-avatar.svg" alt="chat avatar">
      <div class="chat-card__right-side">
          <div class="chat-card__header">
          <span class="chat-card__title">{{chatName}}</span>
            ${last}
          </div>
          <div class="chat-card__content">
          ${shortText}
          ${badgeCount}
          </div>
      </div>
    </div>
    `;
  }
}
