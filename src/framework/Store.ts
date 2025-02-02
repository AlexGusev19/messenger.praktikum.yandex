import set from '../utils/set';
import EventBus from './EventBus';

export type Indexed<T = unknown> = {
  [key in string]: T;
};

export enum StoreEvents {
  Updated = 'updated',
}

export class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    
    set(this.state, path, value);
    console.log({ path, value }, this.state);

    this.emit(StoreEvents.Updated);
  }
} 

export const store = new Store();
