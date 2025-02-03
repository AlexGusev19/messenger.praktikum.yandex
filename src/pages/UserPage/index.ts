import './profile.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components/';
import {  router } from '../../framework/Router';
import {
  userLoginController,
} from '../../controllers/user-login-controller';
import { store, StoreEvents } from '../../framework/Store';
import { PagesList } from '../../types/Pages';
import { mapUserDataToProps } from './helpers/mapUserDataToProps';
import { IUserState, mapUserDataList } from './helpers/mapUserDataList';
import { handleFormButtonClick } from '../../utils/validate';
import { ModalMode } from '../../components/Modal';
import { userDataController } from '../../controllers/user-data-controller';
import { getFormDataToConsole } from '../../utils/getFormDataToConsole';
import { IUserDataUpdate, IUserPasswordUpdate } from '../../api/user-api';

const defaultRows = [
  'Почта',
  'Логин',
  'Имя',
  'Фамилия',
  'Имя в чате',
  'Телефон',
];

export class UserPage extends Block {
  _currentPath: string | undefined;

  constructor() {
    void userLoginController.getUserData();
    const currentPath = router.getCurrentPath();
    const isViewMode = currentPath === PagesList.profile;
    super({
      viewMode: isViewMode,
      ImageLinkComponent: new Components.ImageLink({
        imgSrc: '/images/left-arrow-button.svg',
        imgAlt: 'left arrow',
        href: PagesList.chat,
      }),
      UserAvatarComponent: new Components.UserAvatar({}),
      rowList: defaultRows.map(
        (rowName) => new Components.UserProfileDataRow({ rowName }),
      ),
      actionsList: isViewMode
        ? [
          {
            text: 'Изменить данные',
            href: PagesList.profileChange,
          },
          {
            text: 'Изменить пароль',
            href: PagesList.profileChangePassword,
          },

          {
            text: 'Выйти',
            href: PagesList.login,
            events: {
              click: () => {
                void userLoginController.logout();
              },
            },
          },
        ].map(
          (linkProps) =>
            new Components.Link({ ...linkProps, className: 'profile__link' }),
        )
        : [
          new Components.Button({
            text: 'Сохранить',
            dataPage: PagesList.profile,
            events: {
              click: (event: Event) => {
                const { form } = event.currentTarget as HTMLButtonElement;
                handleFormButtonClick(form!, this.buttonSaveUserDataClick);
              },
            },
          }),
        ],
      Modal: new Components.Modal({ mode: ModalMode.AddUserAvatar }),
    });
    this._currentPath = currentPath;

    store.on(StoreEvents.Updated, () => {
      const { user } = store.getState();
      this.setProps(mapUserDataToProps(store.getState()));
      this.setLists(
        mapUserDataList(user as IUserState, this._currentPath as PagesList),
      );
    });
  }

  buttonSaveUserDataClick = (form: HTMLFormElement) => {
    if (this._currentPath === PagesList.profileChange) {
      void userDataController.updateUserData(
        getFormDataToConsole(form) as unknown as IUserDataUpdate,
      );
    } else if (this._currentPath === PagesList.profileChangePassword) {
      void userDataController.updateUserPassword(
        getFormDataToConsole(form) as unknown as IUserPasswordUpdate,
      );
    }
  };

  openModal = () => {
    this.children.Modal.show();
  };

  componentDidMount() {
    this.setChildren({
      UserAvatarComponent: new Components.UserAvatar({
        callBack: this.openModal,
      }),
    });
  }

  render() {
    const content = this.props.viewMode
      ? `          
        <div class="profile_data">          
          {{{rowList}}}
        </div>

        <div class="profile__main__controls">
          {{{actionsList}}}
        </div> `
      : `
      <form  class="profile_data">        
        {{{rowList}}}
        <div class="profile__control">
          {{{actionsList}}}
        </div>          
      </form>`;

    return `<main class="container">
              <div class="profile__left-side">
                {{{ImageLinkComponent}}}
              </div>  
              <div class="profile__main">
                <div class="profile__main__container">
                <div class="user__avatar__container">
                  {{{UserAvatarComponent}}}       
                  <h1 class="user__avatar__title">{{firstName}}</h1>
                </div>
                  ${content}     
                </div>
              </div>
              {{{Modal}}}
            </main>`;
  }
}
