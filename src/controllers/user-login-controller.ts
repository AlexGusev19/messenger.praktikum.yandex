import { ISignin, LoginAPI, ISignup } from '../api/login-api';
import { router } from '../framework/Router';
import { store } from '../framework/Store';
import { PagesList } from '../types/Pages';

const loginApi = new LoginAPI();

export class UserLoginController {
  public async login(data: ISignin) {
    try {
      await loginApi.request(data);
      router.go(PagesList.chat);
    } catch (error) {
      if (error.reason === 'User already in system') router.go(PagesList.chat);
      console.error('Ошибка входа', error.message);
    }
  }

  public async logout() {
    try {
      await loginApi.logout();
      router.go(PagesList.login);
    } catch (error) {
      console.error('Ошибка выхода', error.message);
    }
  }

  public async createAccount(data: ISignup) {
    try {
      await loginApi.create(data);
      router.go(PagesList.chat);
    } catch (error) {
      console.error('Ошибка создания аккаунта', error.message);
    }
  }

  public async getUserData() {
    try {
      await loginApi.getUserData().then((resp) => {
        store.set('user', JSON.parse(resp as unknown as string));
      });
    } catch (error) {
      console.error('Ошибка получения данных пользователя', error.message);
    }
  }
}

export const userLoginController = new UserLoginController();
