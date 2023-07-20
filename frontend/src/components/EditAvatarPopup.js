import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  useEffect(() => {
    avatar.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Сохранить">
      <input
        id="popup-avatar"
        className="popup__input popup__input_avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatar}
      />
      <span id="popup-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
