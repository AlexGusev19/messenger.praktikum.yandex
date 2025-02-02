import './login.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';
import {  router } from '../../framework/Router';
import { userLoginController } from '../../controllers/user-login-controller';
import { ISignin, ISignup } from '../../api/login-api';
import { PagesList } from '../../types/Pages';
import { handleFormButtonClick } from '../../utils/validate';
import { getFormDataToConsole } from '../../utils/getFormDataToConsole';

const loginPageInputListStructure = [
  {
    type: 'text',
    placeholder: 'Логин',
    name: 'login',
  },
  {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
  },
];

const registrationPageInputListStructure = [
  {
    type: 'text',
    placeholder: 'Почта',
    name: 'email',
  },
  {
    type: 'text',
    placeholder: 'Логин',
    name: 'login',
  },
  {
    type: 'text',
    placeholder: 'Имя',
    name: 'first_name',
  },
  {
    type: 'text',
    placeholder: 'Фамилия',
    name: 'second_name',
  },
  {
    type: 'tel',
    placeholder: 'Телефон',
    name: 'phone',
  },
  {
    type: 'password',
    placeholder: 'Пароль',
    name: 'password',
  },
  {
    type: 'password',
    placeholder: 'Пароль (ещё раз)',
    name: 'password2',
  },
];

export class LoginPage extends Block {
  _currentPath: string | undefined;

  constructor() {
    const currentPath = router.getCurrentPath();

    super({
      title: currentPath === PagesList.login ? 'Вход' : 'Регистрация',
      inputList: (currentPath === PagesList.login
        ? loginPageInputListStructure
        : registrationPageInputListStructure
      ).map((input) => new Components.Input({ ...input, className: 'input' })),
      actionsList: [
        new Components.Button({
          text:
            currentPath === PagesList.login ? 'Войти' : 'Зарегистрироваться',
          events: {
            click: (event: Event) => {
              const { form } = event.currentTarget as HTMLButtonElement;
              const { onFormButtonClick } = this;
              handleFormButtonClick(form!, onFormButtonClick);
            },
          },
        }),
        new Components.Link({
          className: 'login__link',
          text: currentPath === PagesList.login ? 'Нет аккаунта?' : 'Войти',
          href:
            currentPath === PagesList.login
              ? PagesList.registration
              : PagesList.login,
        }),
      ],
    });

    this._currentPath = router.getCurrentPath();
  }

  onFormButtonClick = (form: HTMLFormElement) => {
    if (this._currentPath === PagesList.login) {
      void userLoginController
        .login(getFormDataToConsole(form) as unknown as ISignin)
        .then((response) => console.log({ response }));
    } else if (this._currentPath === PagesList.registration) {
      void userLoginController
        .createAccount(getFormDataToConsole(form) as unknown as ISignup)
        .then((response) => console.log({ response }));
    }
  };

  render() {
    return `<main class="login-page container">
              <div class="login__container">
                <h1 class="login__title">{{title}}</h1>
                <form class="login__form">
                  <div class="login__form__input__container">  
                    {{{inputList}}}                   
                  </div>
                  {{{actionsList}}}           
                </form>
              </div>  
            </main>`;
  }
}
