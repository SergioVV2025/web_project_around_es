class UserInfo {
  constructor({ titleSelector, descriptionSelector }) {
    this._profileTitle = titleSelector;
    this._profileDescription = descriptionSelector;
  }

  getUserInfo() {
    return {
      title: document.querySelector(this._profileTitle).textContent,
      description: document.querySelector(this._profileDescription).textContent,
    };
  }

  setUserInfo({ title, description }) {
    if (title) {
      document.querySelector(this._profileTitle).textContent = title;
    }
    if (description) {
      document.querySelector(this._profileDescription).textContent =
        description;
    }
  }
}

export default UserInfo;
