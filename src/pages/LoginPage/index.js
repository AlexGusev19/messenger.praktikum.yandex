import "./login.pcss";
import Block from '../../framework/Block';
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Input } from "../../components/Input";

export class LoginPage extends Block {
  constructor(props) {
    console.log("LoginPage", props);
    super({
      title: props.title,
      inputList: props.inputItems.map(input => new Input({
          className: input.className,
          type: input.type,
          placeholder: input.placeholder,
          name: input.name,
          errorMessage: input.errorMessage,
        })),
        actionsList: props.actions.map(item => {
            if (item.componentType === "link") {
                return new Link({
                  dataPage: item.dataPage,
                  text: item.text,
                  className: item.className,
                });
            } else if (item.componentType === "button") {
                return new Button({
                  idButton: item.idButton,
                  dataPage: item.dataPage,
                  text: item.text,
                });
            }
        }),
    });
  }

  render() {
    return `<div class="app">
                <main class="login-page container">
                    <div class="login__container">
                        <h1 class="login__title">{{title}}</h1>
                        <form class="login__form">
                            <div class="login__form__input__container">  
                                {{{inputList}}}                   
                            </div>

                            {{{actionsList}}}           
                        </form>
                    </div>  
                </main>
            </div>`;
  }
}
