import * as Pages from "./pages";

const PagesList = {
  Menu: "menuPage",
  Login: "login",
  Registration: "registration",
  Chat: "chat",
  ClientError: "clientError",
  ServerError: "serverError",
  Profile: "profile",
};



export default class App {
  constructor() {
    this.state = {
      currentPage: PagesList.Menu,
      pageClass: {
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
          title: "Menu Page",
          menuMode: true,
          actions: [
            {
              componentType: "link",
              className: "link",
              text: "авторизация",
              dataPage: "login",
            },
            {
              componentType: "link",
              className: "link",
              text: "регистрация",
              dataPage: "registration",
            },
            {
              componentType: "link",
              className: "link",
              text: "чат",
              dataPage: "chat",
            },
            {
              componentType: "link",
              className: "link",
              text: "404",
              dataPage: "clientError",
            },
            {
              componentType: "link",
              className: "link",
              text: "500",
              dataPage: "serverError",
            },
            {
              componentType: "link",
              className: "link",
              text: "профиль",
              dataPage: "profile",
            },
          ],
        },
        login: {
          title: "Вход",
          inputItems: [
            {
              className: "input",
              type: "text",
              placeholder: "Логин",
              name: "login",
            },
            {
              className: "input",
              type: "password",
              placeholder: "Пароль",
              name: "password",
            },
          ],
          actions: [
            {
              componentType: "button",
              id: "login_button",
              text: "Войти",
              dataPage: "chat",
            },
            {
              componentType: "link",
              className: "login__link",
              text: "Нет аккаунта?",
              dataPage: "registration",
            },
          ],
        },
        registration: {
          title: "Регистрация",
          inputItems: [
            {
              className: "input",
              type: "text",
              placeholder: "Почта",
              name: "email",
            },
            {
              className: "input",
              type: "text",
              placeholder: "Логин",
              name: "login",
            },
            {
              className: "input",
              type: "text",
              placeholder: "Имя",
              name: "first_name",
            },
            {
              className: "input",
              type: "text",
              placeholder: "Фамилия",
              name: "second_name",
            },
            {
              className: "input",
              type: "tel",
              placeholder: "Телефон",
              name: "phone",
            },
            {
              className: "input",
              type: "password",
              placeholder: "Пароль",
              name: "password",
            },
            {
              className: "input",
              type: "password",
              placeholder: "Пароль (ещё раз)",
              name: "password2",
            },
          ],
          actions: [
            {
              componentType: "button",
              id: "login_button",
              text: "Зарегистрироваться",
              dataPage: "chat",
            },
            {
              componentType: "link",
              className: "login__link",
              text: "Войти",
              dataPage: "login",
            },
          ],
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
          actions: [
            {
              componentType: "link",
              className: "profile__link",
              text: "Изменить данные",
              dataPage: "profileChange",
            },
            {
              componentType: "link",
              className: "profile__link",
              text: "Изменить пароль",
              dataPage: "profileChangePassword",
            },
            {
              componentType: "link",
              className: "profile__link",
              text: "Выйти",
              dataPage: "login",
            },
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
              inputName: "login",
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
          actions: [
            {
              componentType: "button",
              id: "saveProfileData",
              text: "Сохранить",
              dataPage: "profile",
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
          actions: [
            {
              componentType: "button",
              id: "saveProfileData",
              text: "Сохранить",
              dataPage: "profile",
            },
          ],
        },
      },
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    const {
      state: { pageClass, currentPage, pagesData },
      appElement,
    } = this;

    const template = document.createElement("template");

    if (appElement.firstChild) {
      appElement.firstChild.replaceWith(template);
    } else {
      appElement.appendChild(template);
    }

    const PageComponent = new pageClass[currentPage](pagesData[currentPage]);
    template.replaceWith(PageComponent.getContent());

    this.addEventListeners();
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }

  addEventListeners() {
    const selectElementType = ["a", "form"];
    for (let elementType of selectElementType) {
      const elementsList = document.querySelectorAll(elementType);

      elementsList.forEach((selectedElement) => {
        if (elementType === "form") {
          for (let formControl of selectedElement.elements) {
            if (formControl.nodeName === "INPUT") {
              formControl.addEventListener("blur", () => {
                this.validateElement(formControl);
              });
            }
          }

          selectedElement.addEventListener("submit", (event) => {
            event.preventDefault();
            let isFormValid = true;

            for (let formControl of selectedElement.elements) {
              if (formControl.nodeName === "INPUT") {
                if (!this.validateElement(formControl) && isFormValid) {
                  isFormValid = false;
                }
              }
            }

            if (isFormValid) {
              this.getFormDataToConsole(selectedElement);
              selectedElement.reset();
            } else {
              console.log("Форма не валидна.");
            }
          });
        } else if (elementType === "a") {
          selectedElement.addEventListener("click", (event) => {
            event.preventDefault();

            if (event.target.dataset.page) {
              this.changePage(event.target.dataset.page);
            }
          });
        }
      });
    }
  }

  getFormDataToConsole(form) {
    const formValue = new FormData(form);
    const result = {};

    for (let [key, value] of formValue) {
      result[key] = value;
    }

    console.log({ ...result });
  }

  validateElement(element) {
    const validationRules = {
      first_name: /^[A-ZА-Я]{1}[-A-Za-zА-Яа-я]{2,}$/,
      second_name: /^[A-ZА-Я]{1}[-A-Za-zА-Яа-я]{2,}$/,
      login: /^[\w\d_-]{3,20}$/,
      display_name: /^[\wА-Яа-я\d_-]{3,20}$/,
      email: /^[\w_-]+@[\w]+[.]{1}[\w]+$/,
      phone: /^[+]*[\d]{10,15}$/,
      password: /^[\w\d]{8,40}$/,
      password2: /^[\w\d]{8,40}$/,
      newPassword: /^[\w\d]{8,40}$/,
      newPassword2: /^[\w\d]{8,40}$/,
      oldPassword: /^[\w\d]{8,40}$/,
      message: /^.+$/,
    };
    const checkValidation = validationRules[element.name].test(element.value);
    const errorSpan = document.querySelector(`[data-for=${element.name}]`);
    errorSpan.style.display = checkValidation ? "none" : "block";

    return checkValidation;
  }
}
