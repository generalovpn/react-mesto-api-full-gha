class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(this._baseUrl + `users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(this._baseUrl + `cards`, {
      headers: this._headers,
    });
  }

  postCard({ name, link }) {
    return this._request(this._baseUrl + `cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(_id) {
    return this._request(this._baseUrl + `cards/` + _id, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  patchUserInfo({ name, about }) {
    return this._request(this._baseUrl + `users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  putLike(cardId) {
    return this._request(this._baseUrl + `cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(this._baseUrl + `cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  patchAvatar({ avatar }) {
    return this._request(this._baseUrl + `users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://api.mesto.constantine.nomoredomains.rocks/",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export { api };
