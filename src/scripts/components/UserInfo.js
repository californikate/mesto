export default class UserInfo {
  constructor({ selectorProfileName, selectorProfileJob }) {
    this._profileName = document.querySelector(selectorProfileName);
    this._profileJob = document.querySelector(selectorProfileJob);
  }

  getUserInfo() {
    const userInfo = {};

    userInfo['name'] = this._profileName.textContent;
    userInfo['job'] = this._profileJob.textContent;
    
    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}