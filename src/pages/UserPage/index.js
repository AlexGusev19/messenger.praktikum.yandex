import "./profile.pcss";
import Block from "../../framework/Block";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { ImageLink } from "../../components/ImageLink";
import { UserAvatar } from "../../components/UserAvatar";
import { UserProfileDataRow } from "../../components/UserProfileDataRow";

export class UserPage extends Block {
  constructor(props) {
    console.log("UserPage", props);
    super({
      ImageLinkComponent: new ImageLink({
        imgSrc: "/images/left-arrow-button.svg",
        imgAlt: "left arrow",
        dataPage: "chat",
      }),
      UserAvatarComponent: new UserAvatar({
        userName: props.userName,
        imgSrc: "/images/user-avatar.svg",
        imgAlt: "user avatar",
      }),
      title: props.title,
      rowList: props.itemList.map(
        (row) =>
          new UserProfileDataRow({
            rowName: row.rowName,
            rowData: row.rowData,
          })
      ),
      actionsList: props.actions.map((item) => {
        if (item.componentType === "link") {
          return new Link({
            dataPage: item.dataPage,
            text: item.text,
            className: item.className,
          });
        } else if (item.componentType === "button") {
          return new Button({
            idButton: item.idButton,
            dataPage: item.dataPage,
            text: item.text,
          });
        }
      }),
    });
  }

  render() {
    return `<div class="app">
                <main class="container">
                    <div class="profile__left-side">
                        {{{ImageLinkComponent}}}
                    </div>
                    <div class="profile__main">
                        <div class="profile__main__container">
                            {{{UserAvatarComponent}}}

                            <div class="profile_data">             
                                {{{rowList}}}
                            </div>

                            <div class="profile__main__controls">
                                {{{actionsList}}}
                            </div>         
                        </div>
                    </div>
                </main>
            </div>`;
  }
}
