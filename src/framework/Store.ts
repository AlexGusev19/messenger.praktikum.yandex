import set from '../utils/set';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IUserStructure {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export interface IChatStructure {
  id: string;
  title: string;
  avatar: string;
  unread_count: string;
  created_by: string;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface IStateStructure {
  user?: IUserStructure;
  chats?: IChatStructure[];
  currentChat?: IChatStructure;
}

export class Store extends EventBus {
  private state: IStateStructure = {};

  public getState() {
    return { ...this.state };
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
} 

export const store = new Store();
