import "./login.pcss";
import Block from "../../framework/Block";
import * as Components from "./../../components";

export class LoginPage extends Block {
  constructor(props) {
    super({
      title: props.title,
      menuMode: props.menuMode,
      inputList:
        props.inputItems &&
        props.inputItems.map((input) => new Components.Input({ ...input })),
      actionsList: props.actions.map((item) => {
        if (item.componentType === "link") {
          return new Components.Link({ ...item });
        } else if (item.componentType === "button") {
          return new Components.Button({ ...item });
        }
      }),
    });
  }

  render() {
    const content = this.props.menuMode
      ? `<nav class="menu__list">
            {{{actionsList}}} 
          </nav>`
      : `<form class="login__form">
            <div class="login__form__input__container">  
              {{{inputList}}}                   
            </div>
            {{{actionsList}}}           
          </form>`;

    return `<main class="login-page container">
              <div class="login__container">
                <h1 class="login__title">{{title}}</h1>
                ${content}
              </div>  
            </main>`;
  }
}
