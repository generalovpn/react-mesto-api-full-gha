function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onCloseClick}>
      <figure className="popup__figure">
        <button 
          className="popup__close"
          aria-label="Закрыть"
          onClick={props.onClose}>
        </button>
        <img 
          src={props.card ? props.card.link : ""} 
          alt={props.card ? props.card.name : ""} 
          className="popup__photo"
        />
        <figcaption className="popup__caption">
          {props.card ? props.card.name : ""}
        </figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;