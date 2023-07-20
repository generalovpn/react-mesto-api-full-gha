import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonText="Сохранить"
      onSubmit={handleSubmit}>
      <input
        id="popup-card-title"
        className="popup__input popup__input_edit_title"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength={2}
        maxLength={30}
        onChange={handleChangeName}
        value={name || ""}
      />
      <span id="popup-card-title-error" className="popup__error"></span>
      <input
        id="popup-card-link"
        className="popup__input popup__input_edit_img"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChangeLink}
        value={link || ""}
      />
      <span id="popup-card-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
