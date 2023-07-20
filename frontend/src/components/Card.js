import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardDislike, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  return (
    <article className="card">
      {isOwn && (
        <button
          type="button"
          className="card__button-delete"
          onClick={() => onCardDelete(card._id)}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__bottom">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={`card__button-like ${
              isLiked && "card__button-like_active"
            }`}
            onClick={() =>
              isLiked ? onCardDislike(card._id) : onCardLike(card._id)
            }
          />
          <p className="card__likes-number">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
