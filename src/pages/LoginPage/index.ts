import './login.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';

interface IInputItems {
  className: string;
  type: string;
  placeholder: string;
  name: string;
}

interface IActions {
  componentType: string;
  id?: string;
  className?: string;
  text: string;
  dataPage: string;
}

export interface ILoginPageProps {
  title: string;
  menuMode?: boolean;
  inputItems?: IInputItems[];
  actions: IActions[];
}

export class LoginPage extends Block {
  constructor(props: ILoginPageProps) {
    super({
      title: props.title,
      menuMode: props.menuMode,
      inputList:
        props.inputItems &&
        props.inputItems.map((input) => new Components.Input({ ...input })),
      actionsList: props.actions.map(({ componentType, className, text, dataPage }) => {
        if (componentType === 'link') {
          return new Components.Link({ className, text, dataPage });
        } else if (componentType === 'button') {
          return new Components.Button({ text, dataPage });
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
