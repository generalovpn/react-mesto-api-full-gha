import React from "react";
import error from "../images/ErrorSign.svg";
import ok from "../images/OkSign.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, infoText }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img className="popup__auth-image" src={isSuccess ? ok : error} alt={infoText}/>
        <p className="popup__auth-text">{infoText}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;