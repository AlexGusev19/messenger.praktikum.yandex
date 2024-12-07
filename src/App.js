import Handlebars from 'handlebars';
import * as Pages from './pages';
import * as Components from './components';

Handlebars.registerPartial('Link', Components.Link);
Handlebars.registerPartial('Button', Components.Button);
Handlebars.registerPartial('ImageButton', Components.ImageButton);
Handlebars.registerPartial('Input', Components.Input);
Handlebars.registerPartial('ChatAvatar', Components.ChatAvatar);
Handlebars.registerPartial('ErrorMessage', Components.ErrorMessage);
Handlebars.registerPartial('ImageLink', Components.ImageLink);
Handlebars.registerPartial('UserAvatar', Components.UserAvatar);
Handlebars.registerPartial('UserProfileDataRow', Components.UserProfileDataRow);

export default class App {
  constructor() {
    this.state = {
      currentPage: 'menuPage',
    };
    this.appElement = document.getElementById('app');
  }

  render() {
    let template;
    if (this.state.currentPage === 'login') {
      template = Handlebars.compile(Pages.LoginPage);
      this.appElement.innerHTML = template({
        inputItems: [
          {
            type: "text", placeholder: "Логин", name: "login"
          },
          {
            type: "password", placeholder: "Пароль", name: "password"
          },
        ],
      });
    } else if (this.state.currentPage === 'registry') {
      template = Handlebars.compile(Pages.RegistryPage);
      this.appElement.innerHTML = template({
        inputItems: [
        { type: "text", placeholder: "Почта", name: "email" },
        { type: "text", placeholder: "Логин", name: "login" },
        { type: "text", placeholder: "Имя", name: "first_name" },
        { type: "text", placeholder: "Фамилия", name: "second_name" },
        { type: "tel", placeholder: "Телефон", name: "phone" },
        { type: "password", placeholder: "Пароль", name: "password" },
        { type: "password", placeholder: "Пароль (ещё раз)", name: "password2" },
      ],});
    } else if (this.state.currentPage === 'chat') {
        template = Handlebars.compile(Pages.ChatPage);
        this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'client-error') {
        template = Handlebars.compile(Pages.ClientErrorPage);
        this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'server-error') {
        template = Handlebars.compile(Pages.ServerErrorPage);
        this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'profile') {
        template = Handlebars.compile(Pages.UserPage);
        this.appElement.innerHTML = template({
          itemList: [
            { rowName: 'Почта', rowData: 'pochta@yandex.ru' },
            { rowName: 'Логин', rowData: 'ivanivanov' },
            { rowName: 'Имя', rowData: 'Иван' },
            { rowName: 'Фамилия', rowData: 'Иванов' },
            { rowName: 'Имя в чате', rowData: 'Иван' },
            { rowName: 'Телефон', rowData: '+7 (909) 967 30 30' },
          ],
        });
    } else if (this.state.currentPage === 'menuPage') {
      template = Handlebars.compile(Pages.MenuPage);
      this.appElement.innerHTML = template({
        nav: [
          {
            text: 'авторизация',
            page: 'login',
          },
          {
            text: 'регистрация',
            page: 'registry',
          },
          {
            text: 'чат',
            page: 'chat',
          },
          {
            text: '404',
            page: 'client-error',
          },
          {
            text: '500',
            page: 'server-error',
          },
          {
            text: 'профиль',
            page: 'profile',
          },
          {
            text: 'променять профиль',
            page: 'profileChange',
          },
        ] 
    });
    } else if (this.state.currentPage === 'profileChange') {
      template = Handlebars.compile(Pages.UserPageChange);
      this.appElement.innerHTML = template({
        itemList: [
          { changeMode: true, rowName: 'Почта', inputType: "text", inputName: "email", inputPlaceholder: "pochta@yandex.ru" },
          { changeMode: true, rowName: 'Логин', inputType: "text", inputName: "display_name", inputPlaceholder: "ivanivanov" },
          { changeMode: true, rowName: 'Имя', inputType: "text", inputName: "first_name", inputPlaceholder: "Иван" },
          { changeMode: true, rowName: 'Фамилия', inputType: "text", inputName: "second_name", inputPlaceholder: "Иванов" },
          { changeMode: true, rowName: 'Имя в чате', inputType: "text", inputName: "display_name", inputPlaceholder: "Иван" },
          { changeMode: true, rowName: 'Телефон', inputType: "tel", inputName: "phone", inputPlaceholder: "+7 (909) 967 30 30" },
        ],
      });
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    if (this.state.currentPage === 'menuPage') {
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(e.target.dataset.page);
          this.changePage(e.target.dataset.page);
        });
      });
    } else if (this.state.currentPage === 'login') {
      const loginButton = document.getElementById('login_button');
      console.log('loginButton', loginButton);
      loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.changePage('chat');
        console.log('click');
      });
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(e.target.dataset.page);
          this.changePage(e.target.dataset.page);
        });
      });

    } else {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.target.dataset.page);
            this.changePage(e.target.dataset.page);
            });
        });
    }
  }

  changePage(page) {
    this.state.currentPage = page;
    this.render();
  }
}
