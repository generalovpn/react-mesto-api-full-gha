import { useState, useEffect } from "react";
import "../page/index.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { auth } from "../utils/auth";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
  const [isInfoSuccess, setInfoSuccess] = useState(false);
  const [isInfoTooltipMessage, setInfoTooltipMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function handleLogin({ email, password }) {
    auth
      .login({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        // Object.defineProperty(api, '_headers', {
        //   value: {
        //     authorization: `Bearer ${localStorage.getItem("token")}`,
        //     "Content-Type": "application/json",
        //   },
        // });
        api._headers = {
              authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            }
        setLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setInfoSuccess(false);
        handleToolTip(`Что-то пошло не так! Попробуйте ещё раз.`);
      });
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then(() => {
        handleToolTip(`Вы успешно зарегистрировались!`);
        setInfoSuccess(true);
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        handleToolTip(`Что-то пошло не так! Попробуйте ещё раз.`);
      });
  }

  function handleToolTip(message) {
    setInfoTooltipMessage(message);
    setInfoToolTipOpen(true);
  }

  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
  }



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch(console.log);
    }
  }, [navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cardData]) => {
          setCurrentUser(userInfo);
          const cardDataReversed = cardData.reverse();
          setCards(cardDataReversed);
        })
        .catch(console.log);
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoToolTipOpen(false);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(cardId) {
    api
      .putLike(cardId)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((card) => (card._id === cardId ? newCard : card))
        );
      })
      .catch(console.log);
  }

  function handleCardDislike(cardId) {
    api
      .deleteLike(cardId)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((card) => (card._id === cardId ? newCard : card))
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((card) => card._id !== cardId));
      })
      .catch(console.log);
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name, about })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchAvatar({ avatar })
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.log);
  }
  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onLogOut={handleSignout} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                onCardDislike={handleCardDislike}
                cards={cards}
              />
            }
          />
          <Route
            path='/sign-up'
            element={<Register onRegister={handleRegister} />}
          />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name='submit'
          title='Вы уверены?'
          submitButtonText='Да'></PopupWithForm>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          infoText={isInfoTooltipMessage}
          isSuccess={isInfoSuccess}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
