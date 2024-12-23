import "./style.pcss";
import Block from "../../framework/Block";

export class Input extends Block {
  constructor(props) {
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

