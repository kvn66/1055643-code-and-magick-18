'use strict';

var WIZARDS_COUNT = 4;
var RANDOM_MULTIPLIER = 500;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomIndex = function (array) {
  return (Math.floor(Math.random() * RANDOM_MULTIPLIER)) % array.length;
};

var generateWizard = function () {
  var wizard = {};
  wizard.name = WIZARD_NAMES[getRandomIndex(WIZARD_NAMES)] + ' ' + WIZARD_SECOND_NAMES[getRandomIndex(WIZARD_SECOND_NAMES)];
  wizard.coatColor = COAT_COLORS[getRandomIndex(COAT_COLORS)];
  wizard.eyesColor = EYES_COLORS[getRandomIndex(EYES_COLORS)];
  return wizard;
};

var renderWizard = function () {
  var wizard = generateWizard();

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
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    fragment.appendChild(renderWizard());
  }
  return fragment;
};

window.showSetup = (function () {
  var setupDialog = document.querySelector('.setup');
  var similarListElement = setupDialog.querySelector('.setup-similar-list');

  similarListElement.appendChild(renderWizards());

  setupDialog.classList.remove('hidden');
  setupDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
