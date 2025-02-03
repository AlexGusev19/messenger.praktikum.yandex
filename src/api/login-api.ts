import { BaseAPI } from './base-api';
import { HTTPTransport } from './HTTP';

export interface ISignin {
  login: string;
  password: string;
}

export interface ISignup {
  email: string;
  first_name: string;
  login: string;
  password: string;
  phone: string;
  second_name: string;
}

const loginAPIInstance = new HTTPTransport('api/v2/auth');

export class LoginAPI extends BaseAPI {
  async create(data?: ISignup) {
    try {
      return await loginAPIInstance.post('/signup', { data });
    } catch (error) {
      return console.error(error);
    }
  }

  request(data?: ISignin) {
    return loginAPIInstance.post('/signin', { data });
  }

  logout() {
    return loginAPIInstance.post('/logout');
  }

  getUserData() {
    return loginAPIInstance.get('/user');
  }
}
