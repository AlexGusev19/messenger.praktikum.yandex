import "./style.pcss";
import Block from "../../framework/Block";

export class Input extends Block {
  constructor(props) {
    console.log("Input", props);
    super({
        ...props,
    });
  }

  render() {
    return `
        <input 
            class="{{className}}"
            type="{{type}}" 
            placeholder="{{placeholder}}" 
            name="{{name}}" 
        />
        <span class="error-message">{{errorMessage}}</span>
    `;
  }
}

