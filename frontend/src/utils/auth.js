class Auth {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  register({ email, password }) {
    return this._request(this._baseUrl + "signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  login({ email, password }) {
    return this._request(this._baseUrl + "signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  checkToken(token) {
    return this._request(this._baseUrl + "users/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    } ,
    });
  }
}

const auth = new Auth({
  baseUrl: "https://api.mesto.constantine.nomoredomains.rocks/",
  headers: {
    "Content-Type": "application/json"
  },
});

export { auth };
