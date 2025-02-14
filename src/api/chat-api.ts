import { BaseAPI } from './base-api';
import { HTTPTransport } from './HTTP';

export interface ICreateChat {
  title: 'string';
}

export interface IAddUser {
  users: number[];
  chatId: number;
}

export interface IDataUserToChat {
  users: string[];
  chatId: string;
}

const chatAPIInstance = new HTTPTransport('api/v2/chats');

export class ChatAPI extends BaseAPI {
  request() {
    return chatAPIInstance.get('/');
  }

  requestUsersForChat(id: string) {
    return chatAPIInstance.get(`/${id}/users`);
  }

  addUserForChat(data: IDataUserToChat) {
    return chatAPIInstance.put('/users', { data });
  }

  removeUserForChat(data: IDataUserToChat) {
    return chatAPIInstance.delete('/users', { data });
  }

  createChat(data: ICreateChat) {
    return chatAPIInstance.post('/', { data });
  }

  getChatToken(id: string) {
    return chatAPIInstance.post(`/token/${id}`);
  }
}
