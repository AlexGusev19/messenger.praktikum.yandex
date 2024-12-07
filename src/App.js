import Handlebars from 'handlebars';
import * as Pages from './pages';

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
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'registry') {
      template = Handlebars.compile(Pages.RegistryPage);
      this.appElement.innerHTML = template({});
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
        this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'menuPage') {
      template = Handlebars.compile(Pages.MenuPage);
      this.appElement.innerHTML = template({});
    } else if (this.state.currentPage === 'profileChange') {
      template = Handlebars.compile(Pages.UserPageChange);
      this.appElement.innerHTML = template({});
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
