import '../pages/index.css';
import { enableValidation } from './validate.js';
import { openModal, closeModal, closeModalOnEscape, closeModalOnOverlay} from './modal.js';
import { initialCards, addCard } from './cards';
import avatar_image from '../images/avatar.jpg';
import logo from '../images/logo.svg';

const page = document.querySelector('.page');

// edit (profile) popup

const editPopup = page.querySelector('.popup_type_edit');
editPopup.classList.add('popup_is-animated');
const editButton = page.querySelector('.profile__edit-button');
const editForm = document.forms['edit-profile'];
const profileName = page.querySelector('.profile__title');
const profileDescription = page.querySelector('.profile__description');
const closeEditButton = editPopup.querySelector('.popup__close');

editButton.addEventListener('click', () => {
    editForm.elements['name'].value = profileName.textContent;
    editForm.elements['description'].value = profileDescription.textContent;
    openModal(editPopup);
});

closeEditButton.addEventListener('click', () => {
    closeModal(editPopup);
});

editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = editForm.elements['name'].value;
    const descriptionInput = editForm.elements['description'].value;

    profileName.textContent = nameInput;
    profileDescription.textContent = descriptionInput;

    closeModal(editPopup);
});

// new card popup

const newCardPopup = page.querySelector('.popup_type_new-card');
newCardPopup.classList.add('popup_is-animated');
const newCardButton = page.querySelector('.profile__add-button');
const closeNewCardButton = newCardPopup.querySelector('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');

newCardButton.addEventListener('click', () => {
    openModal(newCardPopup);
});

closeNewCardButton.addEventListener('click', () => {
    closeModal(newCardPopup);
});

newCardForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const placeName = newCardForm.elements['place-name'].value;
    const placeLink = newCardForm.elements['link'].value;

    addCard(placeName, placeLink);

    closeModal(newCardPopup);
    newCardForm.reset();
});

// image popup

const imagePopup = page.querySelector('.popup_type_image');
imagePopup.classList.add('popup_is-animated');
const closeImageButton = imagePopup.querySelector('.popup__close');
closeImageButton.addEventListener('click', () => closeModal(imagePopup));


// cards

function renderInitialCards(cards) {
    cards.forEach((card) => {
        addCard(card.name, card.link);
    });
}

renderInitialCards(initialCards);


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});