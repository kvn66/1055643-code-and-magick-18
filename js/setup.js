'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateRandomWizard = function () {
  return {
    name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SECOND_NAMES),
    coatColor: getRandomItem(COAT_COLORS),
    eyesColor: getRandomItem(EYES_COLORS)
  };
};

var createRandomWizard = function () {
  var wizard = generateRandomWizard();

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var div = document.createElement('div');
  div.classList.add('setup-similar-list');

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < WIZARDS_COUNT; i++) {
    div.appendChild(createRandomWizard());
  }
  fragment.appendChild(div);
  return fragment;
};

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupSimilar = setup.querySelector('.setup-similar');

var onPopupEscPress = function (evt) {
  if (evt.which === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setupSimilar.replaceChild(renderWizards(), setupSimilar.querySelector('.setup-similar-list'));

  setup.querySelector('.setup-similar').classList.remove('hidden');
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  setup.querySelector('.setup-similar').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.which === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var onInputFocused = function (evt) {
  evt.stopPropagation();
};

userNameInput.addEventListener('focus', function () {
  userNameInput.addEventListener('keydown', onInputFocused);
});

userNameInput.addEventListener('blur', function () {
  userNameInput.removeEventListener('keydown', onInputFocused);
});

var setupWizard = setup.querySelector('.setup-wizard');
var wizardCoat = setupWizard.querySelector('.wizard-coat');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = setup.querySelector('.setup-fireball-wrap');

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomItem(COAT_COLORS);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomItem(EYES_COLORS);
});

setupFireballWrap.addEventListener('click', function () {
  var fireballColor = getRandomItem(FIREBALL_COLORS);
  setupFireballWrap.style.backgroundColor = fireballColor;
  setupFireballWrap.querySelector('input').value = fireballColor;
});
