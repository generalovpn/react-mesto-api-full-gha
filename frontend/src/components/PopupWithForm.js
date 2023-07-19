function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`} onMouseDown={props.onCloseClick}>
      <div className="popup__container">
        <button className="popup__close" type="button" title="Закрыть" onClick={props.onClose} />
        <h2 className="popup__name">{props.title}</h2>
        <form 
          className="popup__form" 
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__btn-save">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;