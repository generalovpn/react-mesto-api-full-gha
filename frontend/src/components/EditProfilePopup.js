import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      profile_name: name,
      profile_job: description
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"} 
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <label className="popup__form">
        <input 
          type="text" 
          name="profile_name" 
          id="profile_name" 
          minLength="2" 
          maxLength="40" 
          className="popup__input" 
          placeholder="Укажите имя" 
          required
          onChange={handleNameChange}
          value={name}
        />
        <span className="popup__input-error" id="input_name-error"/>
        <input 
          type="text" 
          name="profile_description" 
          id="profile_description" 
          className="popup__input" 
          placeholder="О себе" 
          minLength="2" 
          maxLength="200" 
          required
          onChange={handleDescriptionChange}
          value={description}
        />
        <span className="popup__input-error" id="input_description-error"/>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;