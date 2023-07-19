function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} onClick={props.onCloseClick}>
      <div className="popup__info">
        <img src={props.image} alt={props.title} className="popup__status" />
        <h2 className="popup__message">{props.title}</h2>
        <button
          onClick={props.onClose}
          className="popup__close"
          title="Закрыть"
          type="button"
        />
      </div>
    </div>
  );
}

export default InfoTooltip;