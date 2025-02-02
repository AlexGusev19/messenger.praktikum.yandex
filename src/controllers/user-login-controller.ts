import { ISignin, LoginAPI, ISignup } from '../api/login-api';
import { router } from '../framework/Router';
import { store } from '../framework/Store';
import { PagesList } from '../types/Pages';

const loginApi = new LoginAPI();

export class UserLoginController {
  public async login(data: ISignin) {
    try {
      await loginApi.request(data);
      router.go(PagesList.profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async logout() {
    try {
      await loginApi.logout();
      router.go(PagesList.login);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async createAccount(data: ISignup) {
    try {
      await loginApi.create(data);
      router.go(PagesList.login);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUserData() {
    try {
      await loginApi.getUserData().then((resp) => {
        store.set('user', JSON.parse(resp));
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const userLoginController = new UserLoginController();
