import * as Components from '../../../components/';
import { PagesList } from '../../../types/Pages';

export interface IUserState {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar?: string;
}

export function mapUserDataList(user: IUserState, routerPath: PagesList) {
  const profileStructure = [
    { rowName: 'Почта', rowData: user.email },
    { rowName: 'Логин', rowData: user.login },
    { rowName: 'Имя', rowData: user.first_name },
    { rowName: 'Фамилия', rowData: user.second_name },
    { rowName: 'Имя в чате', rowData: user.display_name },
    { rowName: 'Телефон', rowData: user.phone },
  ];

  const changeProfileStructure = [
    {
      changeMode: true,
      rowName: 'Почта',
      inputType: 'text',
      inputName: 'email',
      inputPlaceholder: user.email,
      inputValue: user.email,
    },
    {
      changeMode: true,
      rowName: 'Логин',
      inputType: 'text',
      inputName: 'login',
      inputPlaceholder: user.login,
      inputValue: user.login,
    },
    {
      changeMode: true,
      rowName: 'Имя',
      inputType: 'text',
      inputName: 'first_name',
      inputPlaceholder: user.first_name,
      inputValue: user.first_name,
    },
    {
      changeMode: true,
      rowName: 'Фамилия',
      inputType: 'text',
      inputName: 'second_name',
      inputPlaceholder: user.second_name,
      inputValue: user.second_name,
    },
    {
      changeMode: true,
      rowName: 'Имя в чате',
      inputType: 'text',
      inputName: 'display_name',
      inputPlaceholder: user.display_name,
      inputValue: user.display_name,
    },
    {
      changeMode: true,
      rowName: 'Телефон',
      inputType: 'tel',
      inputName: 'phone',
      inputPlaceholder: user.phone,
      inputValue: user.phone,
    },
  ];

  const changePasswordStructure = [
    {
      changeMode: true,
      rowName: 'Старый пароль',
      inputType: 'password',
      inputName: 'oldPassword',
      inputPlaceholder: '------------------',
    },
    {
      changeMode: true,
      rowName: 'Новый пароль',
      inputType: 'password',
      inputName: 'newPassword',
      inputPlaceholder: '------------------',
    },
    {
      changeMode: true,
      rowName: 'Повторите новый пароль',
      inputType: 'password',
      inputName: 'newPassword2',
      inputPlaceholder: '------------------',
    },
  ];

  let dataRow;
  if (routerPath === PagesList.profile) {
    dataRow = profileStructure;
  } else if (routerPath === PagesList.profileChange) {
    dataRow = changeProfileStructure;
  } else {
    dataRow = changePasswordStructure;
  }
  return {
    rowList: dataRow.map(
      (row) => new Components.UserProfileDataRow({ ...row }),
    ),
  };
}
