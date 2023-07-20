import React, { useState, useCallback } from "react";

function Login({ onLogin }) {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    },
    [userData]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onLogin(userData);
    },
    [onLogin, userData]
  );

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <h2 className="auth__form-title">Вход</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={userData.email || ""}
        className="auth__form-input"
        onChange={handleChange}
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={userData.password || ""}
        className="auth__form-input"
        onChange={handleChange}
      />

      <button type="submit" className="auth__button">
        Войти
      </button>
    </form>
  );
}
export default Login;
