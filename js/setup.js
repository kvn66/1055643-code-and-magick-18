'use strict';

var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    fragment.appendChild(createRandomWizard());
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
