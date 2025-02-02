import Block from "../../framework/Block";
import * as Components from "../../components";

export class Chat extends Block {
  constructor() {
    super({
      ChatAvatar: new Components.ChatAvatar({
        chatName: "Вадим",
        avatarSrc: "/images/user-blank-avatar.svg",
        avatarAlt: "chat avatar",
      }),
      MenuButton: new Components.ImageButton({
        imgSrc: "/images/menu-chat.svg",
        imgAlt: "chat menu",
      }),
      AddFileButton: new Components.ImageButton({
        imgSrc: "/images/add-file.svg",
        imgAlt: "add file",
      }),
      SendInput: new Components.InputBase({
        className: "chat__input",
        type: "text",
        placeholder: "Сообщение",
        name: "message",
      }),
      SendButton: new Components.ImageButton({
        imgSrc: "/images/right-arrow-button.svg",
        imgAlt: "send",
        events: {
          click: (event: Event) => {
            const { form } = event.currentTarget as HTMLButtonElement;
            console.log("Форма не валидна.");
          },
        },
      }),
      ChatMessages: [
        new Components.ChatOutcomeMessage({
          message: "Круто!",
          messageDate: "12:00",
        }),
        new Components.ChatOutcomeMessage({
          message: "Круто!",
          messageDate: "12:00",
        }),
      ],
    });
  }

  render() {
    return `
      <div class="chat__main__container">                    
        <div class="chat__main__container__header">                        
            {{{ChatAvatar}}}
            <div class="dropdown">
              <button class="dropdown__button">
                <img src="/images/menu-chat.svg" alt="chat menu" />
              </button>
              <div class="dropdown__content">
                <button>Добавить пользователя</button>
                <br>
                <button>Удалить пользователя</button>
              </div>
            </div>                       
        </div>

        <div class="chat__main__container__content">                                            
          {{{ChatMessages}}}                            
        </div>

        <div class="chat__main__container__footer">
            <form class="chat__main__container__control">
                {{{AddFileButton}}}
                {{{SendInput}}}
                {{{SendButton}}}
            </form>
        </div>
        </div>
      </div>`;
  }
}
