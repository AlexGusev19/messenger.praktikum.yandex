import './error.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';

export interface IErrorPageProps {
  errorStatus: string;
  errorMessage: string;
}

export class ErrorPage extends Block {
  constructor(props: IErrorPageProps) {
    super({
      ErrorMessageComponent: new Components.ErrorMessage({ ...props }),
    });
  }

  render() {
    return `<main class="error-page container">
                {{{ErrorMessageComponent}}}
            </main>`;
  }
}

