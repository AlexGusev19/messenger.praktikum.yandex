import "./chat.pcss";
import Block from '../../framework/Block';
import * as Components from "./../../components";

export class ChatPage extends Block {
  constructor(props) {
    super({
      ...props,
      profileLink: new Components.Link({
        dataPage: "profile",
        text: "Профиль >",
        className: "profile-link",
      }),
      searchInput: new Components.Input({
        className: "chat__left-side__search__control",
        type: "search",
        placeholder: "Поиск",
        name: "search",
      }),
      chatAvatar: new Components.ChatAvatar({
        chatName: "Вадим",
        avatarSrc: "/images/user-blank-avatar.svg",
        avatarAlt: "chat avatar",
      }),
      menuButton: new Components.ImageButton({
        idButton: "chat-menu",
        imgSrc: "/images/menu-chat.svg",
        alt: "chat menu",
      }),
      addFileButton: new Components.ImageButton({
        idButton: "addFile",
        imgSrc: "/images/add-file.svg",
        alt: "add file",
      }),
      sendInput: new Components.Input({
        className: "chat__input",
        type: "text",
        placeholder: "Сообщение",
        name: "message",
      }),
      sendButton: new Components.ImageButton({
        idButton: "send",
        imgSrc: "/images/right-arrow-button.svg",
        alt: "send",
      }),
    });
  }

  render() {
    return `<main class="container">
                <div class="chat__left-side">
                    <div class="chat__left-side__header">
                    {{{profileLink}}}
                    </div>
                    <div class="chat__left-side__search">
                    {{{searchInput}}}
                    </div>
                    <div class="chat__left-side__footer">
                    <div class="chat__left-side__chat-list">

                        <div class="chat-card">
                        <img src="/images/chat-avatar.svg" alt="chat avatar">
                        <div class="chat-card__right-side">
                            <div class="chat-card__header">
                            <span class="chat-card__title">Андрей</span>
                            <span class="chat-card__date">10:49</span>
                            </div>
                            <div class="chat-card__content">
                            <div class="chat-card__short-text">
                                Так увлёкся работой по курсу, что совсем забыл его анонсир...
                            </div>
                            <div class="chat-card__badge">
                                <div class="badge">2</div>
                            </div>
                            </div>
                        </div>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="chat__main">
                    <div class="chat__main__container">
                    <div class="chat__main__container__header">
                        {{{chatAvatar}}}
                        {{{menuButton}}}
                    </div>

                    <div class="chat__main__container__content">
                        <div class="chat__header">
                        17 декабря
                        </div>
                        <div class="chat__income-message">
                        <div class="chat__income-message__text">
                            <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
                            <br>
                            <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>          
                            <div class="chat__income-message__date">11:56</div>  
                        </div>
                        <div class="chat__income-message__img">
                            <img src="/images/Снимок экрана 2020-06-21 в 19.18 1.svg" alt="Снимок экрана">
                        </div>
                        </div>
                        <div class="chat__outcome-message">
                        <div class="chat__outcome-message__text">
                            <div class="message-text">Круто!</div>
                            <div class="message-status">
                            <img src="/images/message-status.svg" alt="message status">
                            </div>
                            <div class="message-date">12:00</div>
                        </div>
                        </div>  
                    </div>

                    <div class="chat__main__container__footer">
                        <form class="chat__main__container__control">
                            {{{addFileButton}}}
                            {{{sendInput}}}
                            {{{sendButton}}}
                        </form>
                    </div>
                    </div>
                </div>
                </main>`;
  }
}

