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

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
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

  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Ура, вы победили!', headerX, headerY);

  headerY += FONT_GAP;
  ctx.fillText('Список результатов:', headerX, headerY);

  var maxTime = getMaxElement(times);

  var barX = CLOUD_X + BAR_GAP;
  var barY = CLOUD_Y + CLOUD_HEIGHT - GAP - FONT_GAP - GAP;

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var saturation = Math.floor(Math.random() * MAX_SATURATION);
      ctx.fillStyle = 'hsl(240, ' + saturation.toString() + '%, 50%)';
    }

    var barHeight = Math.floor((MAX_BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]).toString(), barX, barY + barHeight - GAP);
    ctx.fillText(names[i], barX, CLOUD_Y + CLOUD_HEIGHT - GAP);

    barX += BAR_GAP + BAR_WIDTH;
  }
};
