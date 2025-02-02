import { IUserDataUpdate, IUserPasswordUpdate, UserAPI } from '../api/user-api';
import { router } from '../framework/Router';
import { PagesList } from '../types/Pages';

const userApi = new UserAPI();

export class UserDataController {
  public async updateUserData(data: IUserDataUpdate) {
    try {
      await userApi.updateData(data);
      router.go(PagesList.profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async updateUserPassword(data: IUserPasswordUpdate) {
    try {
      await userApi.updatePassword(data);
      router.go(PagesList.profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async updateUserAvatar(data) {
    try {
      await userApi.updateUserAvatar(data);
      router.go(PagesList.profile);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const userDataController = new UserDataController();
