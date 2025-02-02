import './style.pcss';
import Block from '../../framework/Block';
import * as Components from '../../components';

export interface IInputProps {
  className?: string;
  type: string;
  placeholder?: string;
  name: string;
  value?: string;
  events?: Record<string, (...args: unknown[]) => void>;
  accept?: string;
}

export class Input extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
      input: new Components.InputBase({ ...props }),
    });
  }

  render() {
    return `
      <div class="input__container">
        {{{input}}}
        <span class="error-message" data-for={{name}}>Ошибка валидации поля "{{placeholder}}"</span>
      </div>
    `;
  }
}

