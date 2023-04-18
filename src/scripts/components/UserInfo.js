export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileAbout, selectorAvatar }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileAbout = document.querySelector(selectorProfileAbout);
    this._profileAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    const userInfo = {};

    userInfo['name'] = this._profileName.textContent;
    userInfo['about'] = this._profileAbout.textContent;
    userInfo['avatar'] = this._profileAvatar.src;
    
    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    if (avatar) {
      this._profileAvatar.src = avatar;
    };
  }
}