import '../pages/index.css';
import { initialCards } from './cards';
import { enableValidation } from './validate.js';
import avatar_image from '../images/avatar.jpg';
import logo from '../images/logo.svg';

const page = document.querySelector('.page');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEscape);
    popup.addEventListener('click', closeModalOnOverlay);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEscape);
    popup.removeEventListener('click', closeModalOnOverlay);
}

function closeModalOnEscape(event) {
    if (event.key === 'Escape'){
        [editPopup, newCardPopup].forEach((popup) => {
            closeModal(popup);
        })
    }
}

function closeModalOnOverlay(event) {
    if (event.target === event.currentTarget) {
        const popupClosestOverlay = event.target.closest('.popup');
        closeModal(popupClosestOverlay);
    };
}

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
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const closeImageButton = imagePopup.querySelector('.popup__close');

function openImagePopup(imageSrc, imageAlt) {
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;

    openModal(imagePopup);
}

closeImageButton.addEventListener('click', () => closeModal(imagePopup));

// cards
const placesList = page.querySelector('.places__list');
const cardTemplate = page.querySelector('#card-template').content;

function createCard(name, link) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        cardElement.remove();
    });

    cardElement.querySelector('.card__like-button').addEventListener('click', (event) => {
        event.target.classList.toggle('card__like-button_is-active');
    });

    cardImage.addEventListener('click', () => openImagePopup(link, name));

    return cardElement;
}

function addCard(name, link) {
    const newCard = createCard(name, link);
    placesList.prepend(newCard);
}


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