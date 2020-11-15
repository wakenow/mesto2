export default class UserInfo {
    constructor({ nameSelector, bioSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._bio = document.querySelector(bioSelector);
        this._userAvatar = document.querySelector(avatarSelector);


    }
    getUserInfo() {
        const userData = {};
        userData.name = this._name.textContent;
        userData.bio = this._bio.textContent;
        userData.userAvatar = this._userAvatar.src;
        return userData;
    }
    setUserInfo({ name, bio }) {
        this._name.textContent = name;
        this._bio.textContent = bio;
    }
}