import "./error.pcss";
import Block from "../../framework/Block";
import * as Components from "./../../components";

export class ErrorPage extends Block {
  constructor(props) {
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

