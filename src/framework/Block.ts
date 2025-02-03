import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

type CallBackType = (...args: unknown[]) => void;
type EventBusType = () => EventBus;
type IListProps = Record<string, Block[]>;
type IChildrenProps = Record<string, Block>;

interface IEvent {
  [key: string]: CallBackType;
}

interface IAttr {
  [key: string]: string;
}

export interface ICommonProps {
  [key: string]: string | undefined;
}

type IProps = ICommonProps & {
  events?: IEvent;
  attr?: Record<string, string>;
}; 

interface IPropsWithChildren {
  [key: string]:
  | string
  | boolean
  | Block
  | Block[]
  | IEvent
  | IAttr
  | undefined;
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element: HTMLElement | null = null;

  _id: string = makeUUID();

  protected props: IProps;

  protected children: IChildrenProps;

  protected lists: IListProps;

  protected eventBus: EventBusType;

  constructor(propsWithChildren: IPropsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } =
      this._getChildrenPropsAndLists(propsWithChildren);
    this.props = this._makePropsProxy({ ...(props as IProps) }) as IProps;
    this.children = this._makePropsProxy({ ...children }) as IChildrenProps;
    this.lists = this._makePropsProxy({ ...lists }) as IListProps;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  _render() {
    const propsAndStubs = { ...this.props };
    const tmpId = makeUUID();

    this._removeEvents();

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement(
      'template',
    ) as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([, child]) => {
      const listCont = this._createDocumentElement(
        'template',
      ) as HTMLTemplateElement;
      child.forEach((item) => {
        listCont.content.append(item.getContent());
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  addAttributes() {
    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      if (this._element) {
        this._element.setAttribute(key, value);
      }
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  componentDidUpdate() {
    return true;
  }

  _getChildrenPropsAndLists(propsAndChildren: IPropsWithChildren) {
    const children: IChildrenProps = {};
    const props: Record<string, unknown> = {};
    const lists: IListProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  setProps = (nextProps: IProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setChildren = (nextChildren: IChildrenProps) => {
    if (!nextChildren) {
      return;
    }

    Object.assign(this.children, nextChildren);
  };

  setLists = (nextList: Record<string, Block[]>) => {
    if (!nextList) {
      return;
    }

    Object.assign(this.lists, nextList);
  };

  get element() {
    return this._element;
  }

  render() {
    return '';
  }

  getContent() {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element;
  }

  _makePropsProxy(props: IProps | IChildrenProps | IListProps) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function'
          ? (value as CallBackType).bind(target)
          : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
