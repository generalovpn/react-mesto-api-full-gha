import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (
    `element__btn-delete ${isOwn ? "element__btn-delete_visible" : ""}`
  );

  const cardLikeButtonClassName = (
    `element__heart ${isLiked ? "element__heart_active" : ""}`
  );

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img 
        className="element__picture" 
        src={props.link} 
        alt={props.name} 
        title="Посмотреть в полном размере" 
        onClick={handleClick}/>
      <button 
        className={cardDeleteButtonClassName} 
        type="button" 
        title="Удалить" 
        onClick={handleDeleteClick}
      />
      <figcaption className="element__group">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__like-group">
          <button 
            className={cardLikeButtonClassName} 
            type="button" 
            title="Нравится" 
            onClick={handleLikeClick}
          />
          <p className="element__likes-count">{props.likes}</p>
        </div>
      </figcaption>
    </article>
  )
}

export default Card;