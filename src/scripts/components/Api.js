export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  async editUserInfo({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._getResponse(res))
  }

  async editUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',  
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => this._getResponse(res))
  }

  async getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    }).then(res => this._getResponse(res))
  }

  async addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.place}`,
        link: `${data.link}`
      })
    }).then(res => this._getResponse(res))
  }

  async deleteCards(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => this._getResponse(res))
  }

  async putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'PUT',  
    headers: this._headers
    }).then(res => this._getResponse(res))
  }

  async deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',  
    headers: this._headers
    }).then(res => this._getResponse(res))
  }
}

