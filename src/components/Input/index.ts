import './style.pcss';
import Block from '../../framework/Block';

interface IInputProps {
  className: string;
  type: string;
  placeholder: string;
  name: string;
}

export class Input extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
    });
  }

  render() {
    return `
      <div class="input__container">
        <input 
          class="{{className}}"
          type="{{type}}" 
          placeholder="{{placeholder}}" 
          name="{{name}}" 
        />
        <span class="error-message" data-for={{name}}>Ошибка валидации поля "{{placeholder}}"</span>
      </div>
    `;
  }
}

