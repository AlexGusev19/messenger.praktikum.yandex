import { BaseAPI } from './base-api';
import { HTTPTransport } from './HTTP';

export interface IUserDataUpdate {
  first_name: 'string';
  second_name: 'string';
  display_name: 'string';
  login: 'string';
  email: 'string';
  phone: 'string';
}

export interface IUserPasswordUpdate {
  oldPassword: 'string';
  newPassword: 'string';
}

export interface ISearchUser {
  login: 'string';
}

const userAPIInstance = new HTTPTransport('api/v2/user');

export class UserAPI extends BaseAPI {
  updateData(data?: IUserDataUpdate) {
    return userAPIInstance.put('/profile', { data });
  }

  updatePassword(data?: IUserPasswordUpdate) {
    return userAPIInstance.put('/password', { data });
  }

  updateUserAvatar(data?: FormData) {
    return userAPIInstance.put('/profile/avatar', { data });
  }

  searchUser(data: ISearchUser) {
    return userAPIInstance.post('/search', { data });
  }
}
