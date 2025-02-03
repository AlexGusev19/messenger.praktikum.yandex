import Block from '../../framework/Block';

export interface IOutcomeMessage {
  message: string;
  messageDate: string;
}

export class ChatOutcomeMessage extends Block {
  constructor(props: IOutcomeMessage) {
    super({
      message: props.message,
      messageDate: props.messageDate,
    });
  }

  render() {
    return `
    <div class="chat__outcome-message">
      <div class="chat__outcome-message__text">
          <div class="message-text">{{message}}</div>
          <div class="message-status">
          <img src="/images/message-status.svg" alt="message status">
          </div>
          <div class="message-date">{{messageDate}}</div>
      </div>
    </div> 
    `;
  }
}
