export default class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  async getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  async editUserInfo({name, about}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
  }

  async editUserAvatar({ avatar }) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar', {
      method: 'PATCH',  
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  async getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  async addNewCard(data) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${data.place}`,
        link: `${data.link}`
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
  }

  async deleteCards(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
  }

  async putLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}/likes`, {
    method: 'PUT',  
    headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  async deleteLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${cardId}/likes`, {
    method: 'DELETE',  
    headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}

