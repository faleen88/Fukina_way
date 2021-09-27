const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const tabsNav = document.querySelector('.tabs__nav');
const tabs = document.querySelector('.tabs__list');
const buttons = document.querySelectorAll('.tab__button, .item-price__button');
const modalConnection = document.querySelector('#connection');
const modalConnectionCloseButton = modalConnection.querySelector('.form-connection__close');
const modalConnectionSubmitButton = modalConnection.querySelector('.form-connection__button');
const modalSuccess = document.querySelector('#success');
const modalSuccessCloseButton = modalSuccess.querySelector('.popup-success__close');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
  }
});

const getTabHandler = (evt) => {
  evt.preventDefault();
  if (evt.target.tagName !== 'A') {
    return;
  }

  tabsNav.querySelectorAll('.tabs__link').forEach((item) => item.classList.remove('tabs__link--active'));
  tabs.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.add('tab--hidden');

    if (tab.id === `#${evt.target.dataset.way}`) {
      tab.classList.remove('tab--hidden');
      evt.target.classList.add('tabs__link--active');
    }
  });

}

tabsNav.addEventListener('click', getTabHandler);

const closePopupConnection = () => {
  modalConnection.classList.remove('modal-show');
  modalConnectionCloseButton.removeEventListener('click', closePopupConnectionHandler);
  modalConnectionSubmitButton.removeEventListener('click', submitDataHandler);
  document.removeEventListener('keydown', closeEscKeydownConnectionHandler);
  window.removeEventListener('click', closePopupConnectionHandler);
}

const closePopupConnectionHandler = (evt) => {
  evt.preventDefault();
  if (evt.target === modalConnection || evt.target === modalConnectionCloseButton) {
    closePopupConnection();
  } else {
    return;
  };
}

const closeEscKeydownConnectionHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopupConnection();
  }
}

const closePopupSuccess = () => {
  modalSuccess.classList.remove('modal-show');
  modalSuccessCloseButton.removeEventListener('click', closePopupSuccessHandler);
  document.removeEventListener('keydown', closeEscKeydownSuccessHandler);
  window.removeEventListener('click', closePopupSuccessHandler);
}

const closePopupSuccessHandler = (evt) => {
  evt.preventDefault();
  if (evt.target === modalSuccess || evt.target === modalSuccessCloseButton) {
    closePopupSuccess();
  } else {
    return;
  };
}

const closeEscKeydownSuccessHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopupSuccess();
  }
}

const closeOverlayConnectionHandler = (evt) => {
  evt.preventDefault();
  window.addEventListener('click', closePopupConnectionHandler);
  window.removeEventListener('click', closeOverlayConnectionHandler);
}

const closeOverlaySuccessHandler = (evt) => {
  evt.preventDefault();
  window.addEventListener('click', closePopupSuccessHandler);
  window.removeEventListener('click', closeOverlaySuccessHandler);
}

const submitDataHandler = (evt) => {
  evt.preventDefault();
  modalSuccess.classList.add('modal-show');
  modalSuccessCloseButton.addEventListener('click', closePopupSuccessHandler);
  document.addEventListener('keydown', closeEscKeydownSuccessHandler);
  window.addEventListener('click', closeOverlaySuccessHandler);
  closePopupConnection();
}

const openPopupHandler = () => {
  modalConnection.classList.add('modal-show');
  modalConnectionCloseButton.addEventListener('click', closePopupConnectionHandler);
  modalConnectionSubmitButton.addEventListener('click', submitDataHandler);
  document.addEventListener('keydown', closeEscKeydownConnectionHandler);
  window.addEventListener('click', closeOverlayConnectionHandler);
}

buttons.forEach((button) => {
  button.addEventListener('click', openPopupHandler);
});
