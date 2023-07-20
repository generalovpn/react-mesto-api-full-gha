import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDislike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar-cover" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <p className="profile__info-subtitle">{currentUser.about}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}></button>
      </section>
      <section className="cards content__cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDislike={onCardDislike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
