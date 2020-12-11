export default class UserInfo {
    constructor({ nameSelector, bioSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._bio = document.querySelector(bioSelector);
        this._avatar = document.querySelector(avatarSelector);


    }
    getUserInfo() {
        const userData = {};
        userData.name = this._name.textContent;
        userData.bio = this._bio.textContent;
        return userData;
    }
    setUserInfo({ name, bio }) {
        this._name.textContent = name;
        this._bio.textContent = bio;
    }
    setAvatar(avatar) {
        this._avatar.src = avatar;
    }
}