const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const tabsNav = document.querySelector('.tabs__nav');
const tabs = document.querySelector('.tabs__list');
/*
const Ways = {
  GREECE: 'greece',
  ALBANIA: 'albania',
  MACEDONIA: 'macedonia',
  MONTENEGRO: 'montenegro',
  CROATIA: 'croatia',
};
*/
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
