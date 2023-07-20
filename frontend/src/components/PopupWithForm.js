import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  submitButtonText,
  onSubmit,
}) {
  return (
    <div id={name} className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={`edit-${name}`}
          onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit" value="save">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
