import "./style.pcss";
import Block from "../../framework/Block";
import { Link } from "../../components/Link";

export class ErrorMessage extends Block {
  constructor(props) {
    console.log("ErrorMessage", props);
    super({
      ...props,
      BackLink: new Link({
        dataPage: "chat",
        text: "Назад к чатам",
        className: "link-component",
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
