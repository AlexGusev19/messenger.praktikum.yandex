import "./profile.pcss";
import Block from "../../framework/Block";
import * as Components from "./../../components";

export class UserPage extends Block {
  constructor(props) {
    super({
      viewMode: props.viewMode,
      ImageLinkComponent: new Components.ImageLink({
        imgSrc: "/images/left-arrow-button.svg",
        imgAlt: "left arrow",
        dataPage: "chat",
      }),
      UserAvatarComponent: new Components.UserAvatar({
        userName: props.userName,
        imgSrc: "/images/user-avatar.svg",
        imgAlt: "user avatar",
      }),
      rowList: props.itemList.map(
        (row) => new Components.UserProfileDataRow({ ...row })
      ),
      actionsList: props.actions.map((item) => {
        if (item.componentType === "link") {
          return new Components.Link({ ...item });
        } else if (item.componentType === "button") {
          return new Components.Button({ ...item });
        }
      }),
    });
  }

  render() {
    const content = this.props.viewMode
      ? `<div class="profile_data">             
            {{{rowList}}}
          </div>
          <div class="profile__main__controls">
            {{{actionsList}}}
          </div>`
      : `<form  class="profile_data">        
            {{{rowList}}}
          <div class="profile__control">
            {{{actionsList}}}
          </div>          
        </form>`;

    return `<main class="container">
              <div class="profile__left-side">
                {{{ImageLinkComponent}}}
              </div>  
              <div class="profile__main">
                <div class="profile__main__container">
                  {{{UserAvatarComponent}}}
                  ${content}     
                </div>
              </div>
            </main>`;
  }
}
