import Block from '../../framework/Block';
import { validateElement } from '../../utils/validate';
import { IInputProps } from '../Input';

export class InputBase extends Block {
  constructor(props: IInputProps) {
    super({
      ...props,
      events: {
        blur: (event: Event) => {
          if (
            event.currentTarget &&
            event.currentTarget instanceof HTMLInputElement
          )
            validateElement(event.currentTarget);
        },
      },
    });
  }

  render() {
    return `
      <input 
        class="{{className}}"
        type="{{type}}" 
        placeholder="{{placeholder}}" 
        name="{{name}}" 
        value="{{value}}"
        ${this.props.accept && `accept="${this.props.accept}"`}
      />
    `;
  }
}
