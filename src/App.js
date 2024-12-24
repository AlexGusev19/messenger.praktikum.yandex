import Handlebars from "handlebars";
import * as Pages from "./pages";
import * as Components from "./components";

Handlebars.registerPartial("Link", Components.Link);
Handlebars.registerPartial("Button", Components.Button);
Handlebars.registerPartial("ImageButton", Components.ImageButton);
Handlebars.registerPartial("Input", Components.Input);
Handlebars.registerPartial("ChatAvatar", Components.ChatAvatar);
Handlebars.registerPartial("ErrorMessage", Components.ErrorMessage);
Handlebars.registerPartial("ImageLink", Components.ImageLink);
Handlebars.registerPartial("UserAvatar", Components.UserAvatar);
Handlebars.registerPartial("UserProfileDataRow", Components.UserProfileDataRow);

export default class App {
  constructor() {
    this.state = {
      currentPage: "menuPage",
      pages: {
        menuPage: Pages.LoginPage,
        login: Pages.LoginPage,
        registration: Pages.LoginPage,
        chat: Pages.ChatPage,
        clientError: Pages.ErrorPage,
        serverError: Pages.ErrorPage,
        profile: Pages.UserPage,
        profileChange: Pages.UserPage,
        profileChangePassword: Pages.UserPage,
      },
      pagesData: {
        menuPage: {
          title: 'Menu Page',
          menuMode: true,
          nav: [
            { text: "авторизация", page: "login" },
            { text: "регистрация", page: "registration" },
            { text: "чат", page: "chat" },
            { text: "404", page: "clientError" },
            { text: "500", page: "serverError" },
            { text: "профиль", page: "profile" },
          ],
        },
        login: {
          title: "Вход",
          inputItems: [
            { type: "text", placeholder: "Логин", name: "login" },
            { type: "password", placeholder: "Пароль", name: "password" },
          ],
          actions: {
            link: {
              text: "Нет аккаунта?",
              dataPage: "registration",
            },
            button: {
              id: "login_button",
              text: "Войти",
              dataPage: "chat",
            },
          },
        },
        registration: {
          title: "Регистрация",
          inputItems: [
            { type: "text", placeholder: "Почта", name: "email" },
            { type: "text", placeholder: "Логин", name: "login" },
            { type: "text", placeholder: "Имя", name: "first_name" },
            { type: "text", placeholder: "Фамилия", name: "second_name" },
            { type: "tel", placeholder: "Телефон", name: "phone" },
            { type: "password", placeholder: "Пароль", name: "password" },
            {
              type: "password",
              placeholder: "Пароль (ещё раз)",
              name: "password2",
            },
          ],
          actions: {
            link: {
              text: "Войти",
              dataPage: "login",
            },
            button: {
              id: "login_button",
              text: "Зарегистрироваться",
              dataPage: "chat",
            },
          },
        },
        chat: {},
        clientError: {
          errorStatus: "404",
          errorMessage: "Не туда попали",
        },
        serverError: {
          errorStatus: "500",
          errorMessage: "Мы уже фиксим",
        },
        profile: {
          viewMode: true,
          userName: "Иван",
          itemList: [
            { rowName: "Почта", rowData: "pochta@yandex.ru" },
            { rowName: "Логин", rowData: "ivanivanov" },
            { rowName: "Имя", rowData: "Иван" },
            { rowName: "Фамилия", rowData: "Иванов" },
            { rowName: "Имя в чате", rowData: "Иван" },
            { rowName: "Телефон", rowData: "+7 (909) 967 30 30" },
          ],
        },
        profileChange: {
          itemList: [
            {
              changeMode: true,
              rowName: "Почта",
              inputType: "text",
              inputName: "email",
              inputPlaceholder: "pochta@yandex.ru",
            },
            {
              changeMode: true,
              rowName: "Логин",
              inputType: "text",
              inputName: "display_name",
              inputPlaceholder: "ivanivanov",
            },
            {
              changeMode: true,
              rowName: "Имя",
              inputType: "text",
              inputName: "first_name",
              inputPlaceholder: "Иван",
            },
            {
              changeMode: true,
              rowName: "Фамилия",
              inputType: "text",
              inputName: "second_name",
              inputPlaceholder: "Иванов",
            },
            {
              changeMode: true,
              rowName: "Имя в чате",
              inputType: "text",
              inputName: "display_name",
              inputPlaceholder: "Иван",
            },
            {
              changeMode: true,
              rowName: "Телефон",
              inputType: "tel",
              inputName: "phone",
              inputPlaceholder: "+7 (909) 967 30 30",
            },
          ],
        },
        profileChangePassword: {
          itemList: [
            {
              changeMode: true,
              rowName: "Старый пароль",
              inputType: "password",
              inputName: "oldPassword",
              inputPlaceholder: "------------------",
            },
            {
              changeMode: true,
              rowName: "Новый пароль",
              inputType: "password",
              inputName: "newPassword",
              inputPlaceholder: "------------------",
            },
            {
              changeMode: true,
              rowName: "Повторите новый пароль",
              inputType: "password",
              inputName: "newPassword2",
              inputPlaceholder: "------------------",
            },
          ],
        },
      },
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    const {
      state: { pages, currentPage, pagesData },
      appElement,
    } = this;

    const template = Handlebars.compile(pages[currentPage]);
    appElement.innerHTML = template(pagesData[currentPage]);

    this.addEventListeners();
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }

  addEventListeners() {
    const selectElementType = ["a", "button"];
    for (let elementType of selectElementType) {
      const elements = document.querySelectorAll(elementType);

      elements.forEach((element) => {
        element.addEventListener("click", (e) => {
          e.preventDefault();

          if (e.target.dataset.page) {
            this.changePage(e.target.dataset.page);
          }
        });
      });
    }
  }
}
