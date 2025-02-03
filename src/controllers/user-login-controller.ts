import { ISignin, LoginAPI, ISignup } from '../api/login-api';
import { router } from '../framework/Router';
import { store } from '../framework/Store';
import { PagesList } from '../types/Pages';

export function redirectByXHRStatus(status: number) {
  if (status === 401) {
    router.go(PagesList.login);
  } else if (status === 400) {
    router.go(PagesList.chat);
  } else if (status === 404) {
    router.go(PagesList.clientError);
  } else if (status === 500) {
    router.go(PagesList.serverError);
  }
}

const loginApi = new LoginAPI();

export class UserLoginController {
  public async login(data: ISignin) {
    try {
      await loginApi.request(data);
      return router.go(PagesList.chat);
    } catch (error) {
      redirectByXHRStatus(error.status);
      console.error('Ошибка входа', error.errorMessage);
    }  
  }

  public async logout() {
    try {
      await loginApi.logout();
      router.go(PagesList.login);
    } catch (error) {
      console.error('Ошибка выхода', error.errorMessage);
    }
  }

  public async createAccount(data: ISignup) {
    try {
      await loginApi.create(data);
      router.go(PagesList.chat);
    } catch (error) {
      console.error('Ошибка создания аккаунта', error.errorMessage);
    }
  }

  public async getUserData() {
    try {
      await loginApi.getUserData().then((resp) => {
        store.set('user', JSON.parse(resp as unknown as string));
      });
    } catch (error) {
      redirectByXHRStatus(error.status);
      console.error('Ошибка получения данных пользователя', error.errorMessage);
    }
  }
}

export const userLoginController = new UserLoginController();
