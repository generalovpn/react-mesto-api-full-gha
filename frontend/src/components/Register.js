import React, { useState, useCallback } from "react";
import {  Link } from "react-router-dom";

function Login({ onRegister }) {
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

  const handleSubmit = (e) => {
    let { email, password } = userData;
    e.preventDefault();
    onRegister({ email, password });
  };



  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <h2 className="auth__form-title">Регистрация</h2>
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
        Зарегистрироваться
      </button>
        <Link to="/sign-in" className="auth__signin-link">
          Уже зарегистрированы? Войти
        </Link>
    </form>
  );
}
export default Login;
