import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      avatar_link: ref.current.value
    });
  }

  React.useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"} 
      isOpen={props.isOpen}
      onCloseClick={props.onCloseClick}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={"Сохранить"}
    >
      <input
        id="avatar_link"
        type="url" 
        className="popup__input popup__input_type_link"
        name="avatar_link" 
        placeholder="Ссылка на картинку" 
        required
        ref={ref}
      />     
      <span className="popup__input-error" id="input-avatar-error"/>
    </PopupWithForm>

  )
}

export default EditAvatarPopup;