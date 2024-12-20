export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', (evt) => closeModalOnEscape(evt, popup));
    popup.addEventListener('click', (evt) => closeModalOnOverlay(evt, popup));
}

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', (evt) => closeModalOnEscape(evt, popup));
    popup.removeEventListener('click', (evt) => closeModalOnOverlay(evt, popup));
}

function closeModalOnEscape(event, popup) {
    if (event.key === 'Escape'){
        closeModal(popup);
    }
}

function closeModalOnOverlay(event, popup) {
    if (event.target === event.currentTarget) {
        closeModal(popup);
    };
}