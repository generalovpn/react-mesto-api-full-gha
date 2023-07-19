import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img className="profile__img" src={currentUser.avatar} alt={currentUser.name}/>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__btn-edit" type="button" onClick={props.onEditProfile}></button>
          <p className="profile__about-me">{currentUser.about}</p>
        </div>
        <button className="profile__btn-add" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
          {props.cards.map((card, id) => (
              <Card 
                key={id}
                card={card}
                link={card.link}
                name={card.name}
                likes={card.likes.length}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            ))}
      </section>
    </main>
  )
}

export default Main;