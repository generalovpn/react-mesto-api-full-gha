import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      name: name,
      link: link,
    })
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add"}
      form={"placeData"}
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={'Добавить'}
    >
      <label className="popup__form">
        <input 
          type="text" 
          name="name"
          id="input-title" 
          className="popup__input" 
          placeholder="Название" 
          minLength="2" 
          maxLength="30" 
          required
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-error" id="input-title-error"></span>
        <input 
          type="url" 
          name="link" 
          id="input-link" 
          className="popup__input" 
          placeholder="Ссылка на картинку" 
          required
          onChange={handleLinkChange}
          value={link}
        />
        <span className="popup__input-error" id="input-link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;