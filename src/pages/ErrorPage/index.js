import "./error.pcss";
import Block from "../../framework/Block";
import { ErrorMessage } from "../../components/ErrorMessage";

export class ErrorPage extends Block {
  constructor(props) {
    console.log("ErrorPage", props);
    super({
      ErrorMessageComponent: new ErrorMessage({
        errorStatus: props.errorStatus,
        errorMessage: props.errorMessage,
      }),
    });
  }

  render() {
    return `<div class="app">
            <main class="error-page container">
                {{{ErrorMessageComponent}}}
            </main>
        <div>`;
  }
}

