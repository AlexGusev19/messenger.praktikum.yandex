import { ChatAPI, ICreateChat } from '../api/chat-api';
import { ISearchUser } from '../api/user-api';
import { store } from '../framework/Store';

const chatApi = new ChatAPI();

export class ChatController {
  public async getChatList() {
    try {
      await chatApi.request().then((resp) => {
        const chats = JSON.parse(resp);
        if (chats) {
          store.set('chats', chats);
          store.set('currentChat', chats[0]);
          console.log('store', { store });
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async createChat(data: ICreateChat) {
    try {
      await chatApi.create(data);
      await this.getChatList();
      console.log('createChat', store);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getUsersForChat(id: string) {
    try {
      await chatApi
        .requestUsersForChat(id)
        .then((resp) => console.log('getUsersForChat', resp));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async addUserForChat(data: ISearchUser) {
    try {
      await userApi
        .searchUser(data)
        .then((resp) => {
          const [userData] = JSON.parse(resp);
          return userData.id;
        })
        .then((id) => {
          const dataUserToChat = {
            users: [id],
            chatId: '46137',
          };
          void chatApi.addUserForChat(dataUserToChat);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async removeUserForChat(data: ISearchUser) {
    try {
      await userApi
        .searchUser(data)
        .then((resp) => {
          const [userData] = JSON.parse(resp);
          return userData.id;
        })
        .then((id) => {
          const dataRemoveUserFromChat = {
            users: [id],
            chatId: '46137',
          };
          void chatApi.removeUserForChat(dataRemoveUserFromChat);
        });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async getChatToken(id: string) {
    try {
      await chatApi.getChatToken(id).then((resp) => console.log(resp));
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const chatController = new ChatController();
