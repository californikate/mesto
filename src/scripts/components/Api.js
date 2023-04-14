export default class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  async getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      headers: {
        authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  async handleUserAvatar(avatar) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me/avatar', {
      method: 'PATCH',  
      headers: {
          authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
          'Content-Type': 'application/json'
        },
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

  async getUserInfo() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/users/me', {
      headers: {
        authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93'
      }
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
      headers: {
        authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
        'Content-Type': 'application/json'
      },
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

  async addNewCard({name, link}) {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-64/cards', {
      method: 'POST',
      headers: {
        authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }) 
  }

  deleteCard() {

  }

  getLikesAmount() {

  }



  async putLike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${card._id}/likes`, {
    method: 'PUT',  
    headers: {
        authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  async deleteLike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-64/cards/${card._id}/likes`, {
    method: 'DELETE',  
    headers: {
        authorization: '3f5cc6a6-98a9-4c26-9b05-22f5deba7e93',
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  
}

