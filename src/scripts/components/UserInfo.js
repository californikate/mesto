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
    userInfo['id'] = this._id;
    
    return userInfo;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._id = _id;
    if (avatar) {
      this._profileAvatar.src = avatar;
    };
  }
}