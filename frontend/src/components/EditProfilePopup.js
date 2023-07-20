import React, { useContext, useState, useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState();
  const [about, setAbout] = useState();

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Сохранить">
      <input
        id="popup-profile-name"
        className="popup__input popup__input_edit_name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        onChange={handleChangeName}
        value={name || ""}
      />
      <span id="popup-profile-name-error" className="popup__error"></span>
      <input
        id="popup-profile-status"
        className="popup__input popup__input_edit_status"
        type="text"
        name="about"
        placeholder="Призвание"
        required
        minLength={2}
        maxLength={200}
        onChange={handleChangeAbout}
        value={about || ""}
      />
      <span id="popup-profile-status-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
