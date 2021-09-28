const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const tabsSection = document.querySelector('.tabs');
const tabsNav = tabsSection.querySelector('.tabs__nav');
const tabsNavLincs = tabsNav.querySelectorAll('.tabs__link');
const tabs = tabsSection.querySelectorAll('.tab');
const buttonsOpenPopap = document.querySelectorAll('.tab__button, .item-price__button');
const buttonsLink = document.querySelectorAll('.catalog__link');
const modalConnection = document.querySelector('#connection');
const modalConnectionCloseButton = modalConnection.querySelector('.form-connection__close');
const modalSuccess = document.querySelector('#success');
const modalSuccessCloseButton = modalSuccess.querySelector('.popup-success__close');

const formConnection = modalConnection.querySelector('.form-connection');
const phoneInput = modalConnection.querySelector('.data__input--phone');
const emailInput = modalConnection.querySelector('.data__input--email');

const form = document.querySelector('.form');
const formPhoneInput = form.querySelector('.data__input--phone');
const formEmailInput = form.querySelector('.data__input--email');

navMain.classList.remove('main-nav--nojs');
navMain.classList.add('main-nav--yesjs');

// Меню

navToggle.addEventListener('click', () => {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
  }
});

// Каталог

const offset = (el) => {
  var rect = el.getBoundingClientRect(),
  scrollTop = document.documentElement.scrollTop;
  return { top: rect.top + scrollTop }
}

const getCurrentTabHandler = (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== 'A') {
    return;
  }

  tabsNavLincs.forEach((item) => item.classList.remove('tabs__link--active'));
  window.scrollTo(0, offset(tabsSection).top);

  tabs.forEach((tab) => {
    tab.classList.add('tab--hidden');

    if (tab.id === evt.target.dataset.way) {
      tab.classList.remove('tab--hidden');

      tabsNavLincs.forEach((item) => {
        if (item.dataset.way === evt.target.dataset.way) {
          item.classList.add('tabs__link--active');
        }
      });
    }
  });

}

// Табы

const getTabHandler = (evt) => {
  evt.preventDefault();
  if (evt.target.tagName !== 'A') {
    return;
  }

  tabsNav.querySelectorAll('.tabs__link').forEach((item) => item.classList.remove('tabs__link--active'));

  tabs.forEach((tab) => {
    tab.classList.add('tab--hidden');

    if (tab.id === evt.target.dataset.way) {
      tab.classList.remove('tab--hidden');
      evt.target.classList.add('tabs__link--active');
    }
  });
}

buttonsLink.forEach((button) => {
  button.addEventListener('click', getCurrentTabHandler);
});

tabsNav.addEventListener('click', getTabHandler);

// Формы

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

let isStorageSupport = true;
let storagePhone = '';
let storageEmail = '';

try {
  storagePhone = localStorage.getItem('phone');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

const openPopupHandler = (evt) => {
  evt.preventDefault();
  modalConnection.classList.add('modal-show');

  if (storagePhone) {
    phoneInput.value = storagePhone;
    emailInput.focus();
    if (storageEmail) {
      emailInput.value = storageEmail;
      phoneInput.focus();
    }
  } else {
    phoneInput.focus();
  }

  modalConnectionCloseButton.addEventListener('click', closePopupConnectionHandler);
  document.addEventListener('keydown', closeEscKeydownConnectionHandler);
}

buttonsOpenPopap.forEach((button) => {
  button.addEventListener('click', openPopupHandler);
});

formConnection.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (!phoneInput.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('phone', phoneInput.value);
      localStorage.setItem('email', emailInput.value);
    }
  }

  modalSuccess.classList.add('modal-show');
  modalSuccessCloseButton.addEventListener('click', closePopupSuccessHandler);
  document.addEventListener('keydown', closeEscKeydownSuccessHandler);
  closePopupConnection();
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  modalSuccess.classList.add('modal-show');
  modalSuccessCloseButton.addEventListener('click', closePopupSuccessHandler);
  document.addEventListener('keydown', closeEscKeydownSuccessHandler);
  formPhoneInput.value = '';
  formEmailInput.value = '';
})
