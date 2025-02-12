import { router } from './framework/Router';
import * as Pages from './pages';
import { PagesList } from './types/Pages';

export default class App {
  render() {
    router
      .use(PagesList.login, Pages.LoginPage)
      .use(PagesList.registration, Pages.LoginPage)
      .use(PagesList.profile, Pages.UserPage)
      .use(PagesList.profileChange, Pages.UserPage)
      .use(PagesList.profileChangePassword, Pages.UserPage)
      .use(PagesList.chat, Pages.ChatPage)
      .use(PagesList.clientError, Pages.ErrorPage)
      .use(PagesList.serverError, Pages.ErrorPage)
      .start();
  }
}
