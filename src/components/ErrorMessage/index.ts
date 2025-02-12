import './style.pcss';
import Block from '../../framework/Block';
import { Link } from '../Link';
import { PagesList } from '../../types/Pages';

interface IErrorMessageProps {
  errorStatus: string;
  errorMessage: string;
}

export class ErrorMessage extends Block {
  constructor(props: IErrorMessageProps) {
    super({
      ...props,
      BackLink: new Link({
        href: PagesList.chat,
        text: 'Назад к чатам',
        className: 'link-component',
      }),
    });
  }

  render() {
    return `
    <div class="error__container" >
        <h1 class="error__title">{{errorStatus}}</h1>
        <h2 class="error__subtitle">{{errorMessage}}</h2>
        {{{BackLink}}}
    </div>`;
  }
}
