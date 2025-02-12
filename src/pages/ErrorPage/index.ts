import './error.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';
import { router } from '../../framework/Router';
import { PagesList } from '../../types/Pages';

export interface IErrorPageProps {
  errorStatus: string;
  errorMessage: string;
}

export const clientErrorStructure: IErrorPageProps = {
  errorStatus: '404',
  errorMessage: 'Не туда попали',
};

export const serverErrorStructure: IErrorPageProps = {
  errorStatus: '500',
  errorMessage: 'Мы уже фиксим',
};

export class ErrorPage extends Block {
  constructor() {
    const content =
      router.getCurrentPath() === PagesList.clientError
        ? clientErrorStructure
        : serverErrorStructure;
    super({
      ErrorMessageComponent: new Components.ErrorMessage({ ...content }),
    });
  }

  render() {
    return `<main class="error-page container">
                {{{ErrorMessageComponent}}}
            </main>`;
  }
}

