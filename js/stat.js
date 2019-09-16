'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var FONT_GAP = 16;
var MAX_BAR_HEIGHT = -150;
var MAX_SATURATION = 90;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (text, ctx, x, y, color, font) {
  color = typeof color !== 'undefined' ? color : '#000';
  font = typeof font !== 'undefined' ? font : '16px "PT Mono"';
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.fillText(text, x, y);
};

var getBarColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  }
  var saturation = Math.floor(Math.random() * MAX_SATURATION);
  return 'hsl(240, ' + saturation.toString() + '%, 50%)';
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var headerX = CLOUD_X + GAP + GAP;
  var headerY = CLOUD_Y + GAP + GAP + FONT_GAP;

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText('Ура, вы победили!', ctx, headerX, headerY);

  headerY += FONT_GAP;
  renderText('Список результатов:', ctx, headerX, headerY);

  var maxTime = getMaxElement(times);

  var barX = CLOUD_X + BAR_GAP;
  var barY = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP;

  for (var i = 0; i < names.length; i++) {
    var barHeight = Math.floor((MAX_BAR_HEIGHT * times[i]) / maxTime);
    renderBar(ctx, barX, barY, BAR_WIDTH, barHeight, getBarColor(names[i]));

    renderText(Math.floor(times[i]).toString(), ctx, barX, barY + barHeight - GAP);
    renderText(names[i], ctx, barX, CLOUD_Y + CLOUD_HEIGHT - GAP);

    barX += BAR_GAP + BAR_WIDTH;
  }
};
