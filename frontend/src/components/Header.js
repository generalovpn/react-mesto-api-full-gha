import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({email, onLogOut}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__nav">
              <p className="header__email">{email}</p>
              <Link className="header__link header__link_active" onClick={onLogOut}>
                Выйти
              </Link>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to={"/sign-in"}>
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to={"/sign-up"}>
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
