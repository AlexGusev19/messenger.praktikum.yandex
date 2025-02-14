import { ChatAPI, ICreateChat } from '../api/chat-api';
import { ISearchUser, UserAPI } from '../api/user-api';
import { router } from '../framework/Router';
import { store } from '../framework/Store';
import { PagesList } from '../types/Pages';

const chatApi = new ChatAPI();
const userApi = new UserAPI();

export class ChatController {
  public async getChatList() {
    try {
      await chatApi.request().then((resp) => {
        const chats = JSON.parse(resp as unknown as string);
        if (chats.length) {
          store.set('chats', chats);
          // if (!store.getState().currentChat) store.set('currentChat', chats[0]);
        }
      });
    } catch (error) {
      console.error('Ошибка получения списка чатов', error.errorMessage);
    }
  }

  public async createChat(data: ICreateChat) {
    try {
      await chatApi.createChat(data);
      router.go(PagesList.chat);
    } catch (error) {
      console.error('Ошибка создания чата', error.errorMessage);
    }
  }

  public async getUsersForChat(id: string) {
    try {
      await chatApi
        .requestUsersForChat(id)
        .then((resp) => console.log('getUsersForChat', resp));
    } catch (error) {
      console.error(
        'Ошибка получения списка пользователей чата',
        error.errorMessage,
      );
    }
  }

  public async addUserForChat(data: ISearchUser, chatId: string) {
    try {
      await userApi
        .searchUser(data)
        .then((resp) => {
          const [userData] = JSON.parse(resp as unknown as string);

          return userData.id;
        })
        .then((id) => {
          const dataUserToChat = {
            users: [id],
            chatId,
          };
          void chatApi.addUserForChat(dataUserToChat);
        });
      router.go(PagesList.chat);
    } catch (error) {
      console.error('Ошибка добавления пользователя в чат', error.errorMessage);
    }
  }

  public async removeUserForChat(data: ISearchUser, chatId: string) {
    try {
      await userApi
        .searchUser(data)
        .then((resp) => {
          const [userData] = JSON.parse(resp as unknown as string);
          return userData.id;
        })
        .then((id) => {
          const dataRemoveUserFromChat = {
            users: [id],
            chatId,
          };
          void chatApi.removeUserForChat(dataRemoveUserFromChat);
        });
      router.go(PagesList.chat);
    } catch (error) {
      console.error('Ошибка удаления пользователя из чат', error.errorMessage);
    }
  }

  public async getChatToken() {
    try {
      await this.getChatList();
      const { currentChat, user } = store.getState();

      return await chatApi.getChatToken(currentChat!.id).then((resp) => {
        const { token } = JSON.parse(resp as unknown as string);
        
        return { token, userId: user!.id, chatId: currentChat!.id };
      });
    } catch (error) {
      console.error('Ошибка получения токена для чата', error.errorMessage);
    }
  }

  public async setCurrentChat(chatID: string) {
    try {
      await this.getChatList();
      const { chats } = store.getState();

      const currentChat = chats?.find((chat) => chat.id === chatID);
      store.set('currentChat', currentChat);
      return currentChat;
    } catch (error) {
      console.error('Ошибка добавления текущего чата', error.errorMessage);
    }
  }
}

export const chatController = new ChatController();
