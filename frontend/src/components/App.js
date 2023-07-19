import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import resolve from "../images/popup_icon_reg.svg";
import reject from "../images/popup_icon_nreg.svg";

function App() {
  const navigate = useNavigate();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);

  function onRegister(email, password) {
    apiAuth.registerUser(email, password).then(() => {
      setPopupImage(resolve);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    }).finally(handleInfoTooltip);
  }

  function onLogin(email, password) {
    apiAuth.loginUser(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmailName(email);
      navigate("/");
    }).catch(() => {
      setPopupImage(reject);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      handleInfoTooltip();
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth.getToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmailName(res.data.email);
        }
      }).catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(([user, cards]) => {
      setCurrentUser(user);
      setCards(cards);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  function handleUpdateUser(data) {
    api.updateUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
  
    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.log(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.log(err);
      });
    }
  }
  
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
    api.removeCard(card).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.log(err);
    });
  }
  
  function handleAvatarUpdate(data) {
    api.updateProfileAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handlePopupCloseClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip(false);
  }

  useEffect(() => {
    if (isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || infoTooltip) {
      function handleEsc(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }

      document.addEventListener("keydown", handleEsc);

      return () => {
        document.removeEventListener("keydown", handleEsc);
      }
    }
  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard, infoTooltip]);
  
  function onSignOut() {
    setIsLoggedIn(false);
    setEmailName(null);
    navigate("/sign-in");
    localStorage.removeItem("jwt");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="/sign-in" element={
              <>
                <Header title="Регистрация" route="/sign-up"/>
                <Login onLogin={onLogin} />
              </>
            }/>

            <Route path="/sign-up" element={
              <>
                <Header title="Войти" route="/sign-in"/>
                <Register onRegister={onRegister} />
              </>
            }/>

            <Route exact path="/" element={
              <>
                <Header title="Выйти" mail={emailName} onClick={onSignOut} route="" />
                <ProtectedRoute
                  component={Main}
                  isLogged={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </>
            }/>

            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} />
          </Routes>

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onCloseClick={handlePopupCloseClick} 
            onClose={closeAllPopups} 
            onSubmit={handleUpdateUser}
          />
          
          <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onCloseClick={handlePopupCloseClick} 
            onClose={closeAllPopups} 
            onSubmit={handleAddPlaceSubmit}
          />
          
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onCloseClick={handlePopupCloseClick} 
            onClose={closeAllPopups} 
            onSubmit={handleAvatarUpdate}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen} 
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups}
          />

          <InfoTooltip 
            image={popupImage} 
            title={popupTitle} 
            isOpen={infoTooltip} 
            onCloseClick={handlePopupCloseClick}
            onClose={closeAllPopups} 
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;