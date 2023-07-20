import React from "react";

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_image ${card.link ? 'popup_opened' : ''}`}>
      <div className="popup__container-image">
        <button
          type="button"
          className="popup__close-button popup__close-button_image" onClick={onClose}></button>
        <img className="popup__image" src={card.link} alt={card.name}  />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;