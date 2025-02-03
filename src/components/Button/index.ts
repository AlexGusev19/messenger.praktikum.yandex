import './style.pcss';
import Block from '../../framework/Block';

interface IButtonProps {
  text: string;
  className?: string;
  dataPage?: string;
  events?: Record<string, (...args: unknown[]) => void>;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          event.preventDefault();
          props.events?.click(event);          
        },
      },
    });
  }

  render() {
    const className = this.props.className ?? 'button';

    return `
      <button class=${className}>
          {{text}}
      </button>`;
  }
}
