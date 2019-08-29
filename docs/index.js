/**
 * @fileoverview BABYLON "F" generator
 * @author twitter:@billstw
 * 
 * Copyright (c) 2019 bills-appworks
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
'use strict';

/*
 * Definitions
 */

var selectFontV1_0_0 = [
  {
    displayEn: "Serif(Browser)",
    displayJa: "明朝体(ブラウザ)",
    style: "serif",
  },
  {
    displayEn: "Sans Serif(Browser)",
    displayJa: "ゴシック体(ブラウザ)",
    style: "sans-serif",
  },
  {
    displayEn: "Libre Caslon Text(Google Fonts)",
    displayJa: "Libre Caslon Text(Google Fonts)",
    style: "'Libre Caslon Text'",
  },
  {
    displayEn: "Special Elite(Google Fonts)",
    displayJa: "Special Elite(Google Fonts)",
    style: "'Special Elite'",
  },
  {
    displayEn: "Noto Serif JP(Google Fonts)",
    displayJa: "Noto Serif JP(Google Fonts)",
    style: "'Noto Serif JP'",
  },
  {
    displayEn: "Prata(Google Fonts)",
    displayJa: "Prata(Google Fonts)",
    style: "'Prata'",
  }
];

var defaultPropertyV1_0_0 = {
  "char": {
    "notation": "F",
    "font": 0,
    "count": 10000,
    "size": 12,
    "color": {
      "r": 0,
      "g": 0,
      "b": 0
    }
  },
  "stain": {
    "count": 10,
    "size": 50,
    "color": {
      "r": 40,
      "g": 10,
      "b": 20,
      "a": 0.7
    },
    "bleeding": 5,
    "shape": [
      [80, 50, 50, 70, 70, 60, 70, 60],
      [80, 80, 70, 90, 70, 90, 70, 70],
      [30, 80, 60, 60, 40, 50, 80, 70]
    ]
  },
  "paper": {
    "height": 400,
    "width": 297,
    "color": {
      "r": 255,
      "g": 255,
      "b": 255
    }
  },
  "other": {
    "randomSeed": 8452460,
    "renderVersion": "1.0.0",
    "verbose": 0,
    "language": undefined
  }
};

var limitV1_0_0 = {
  char: {
    notation: {min: 0, max: 10},
    count: {min: 0, max: 50000},
    size: {min: 1, max: 100}
  },
  stain: {
    count: {min: 0, max: 50000},
    size: {min: 1, max: 100},
    alpha: {min: 0, max: 100},
    bleeding: {min: 0, max: 10}
  },
  paper: {
    height: {min: 100, max: 10000},
    width: {min: 100, max: 10000}
  },
  other: {
    randomSeed: {min: 1, max: 2147483647},
    verbose: {min: 0, max: 1}
  }
}

/*
 * Status
 */

var effectiveProperty = {};

var context = {
  charRandom: [],
  stainRandom: []
};

/*
 * Initial procedure on load
 * (This script import HTML must set "defer" attribute in script tag)
 */
adjustLayout();
var paramObj = parseUrlParameter();
paramObj.v = validateRenderVersion(paramObj.v);
$.extend(true, effectiveProperty, getDefaultProperty(paramObj.v));
applyBrowserLanguage();
applyUrlParameter(paramObj);
displayProperty();
displayVerbose();
render();
displayReplayUrl();
// End of initial procedure

/*
 * Subroutines
 */

/**
 * Adjust UI layout by window size and UI element size
 */
function adjustLayout() {
  var browserWidth = window.innerWidth;
  // Get each pane width includes margin
  var paperWidth = $('.paperPane').outerWidth(true);
  var controlWidth = $('.controlPane').outerWidth(true);
  if ((paperWidth + controlWidth) < browserWidth) {
    $('.paneLayout').removeClass('paneLayoutNarrow').addClass('paneLayoutWide');
  } else {
    $('.paneLayout').removeClass('paneLayoutWide').addClass('paneLayoutNarrow');
  }
}

/**
 * Get fonts definition object for corresponding to context version
 * @return {object} parsed parameter object
 */
function parseUrlParameter() {
  var paramObj = {};
  var urlParameter = location.search;
  if (urlParameter && urlParameter.length > 1) {
    urlParameter.substring(1).split('&').map(function(element) {
      var keyvalue = element.split('=');
      paramObj[keyvalue[0]] = keyvalue[1];
    });
  }
  return paramObj;
}

/**
 * Validate and response for version literal
 * @param {string} version version literal from outside 
 * @return {string} canonical version literal
 */
function validateRenderVersion(version) {
  switch(version) {
    case '1.0.0':
      return version;

    default:
      // to be latest version
      return '1.0.0';
  }
}

/**
 * Get property object for corresponding to version literal
 * @param {string} version version literal
 * @return {object} property object
 */
function getDefaultProperty(version) {
  switch (version) {
    case '1.0.0':
    default:
      return defaultPropertyV1_0_0;
  }
}

/**
 * Apply web browser language preference
 */
function applyBrowserLanguage() {
  var browserLanguage = window.navigator.language ? window.navigator.language.substring(0, 2) : undefined;
  effectiveProperty.other.language = browserLanguage;
  switchLanguage(browserLanguage);
}

/**
 * Switch display language
 * @param {string} language display language identification (2 letter)
 */
function switchLanguage(language) {
  switch(language) {
    case 'ja':
      $("[lang='ja']").removeClass('hideByLanguage');
      $("[lang='en']").addClass('hideByLanguage');
      break;

    case 'en':
    default:
      $("[lang='en']").removeClass('hideByLanguage');
      $("[lang='ja']").addClass('hideByLanguage');
      break;
  }

  var selectFont = $('#propCharFont').val();
  $('#propCharFont > option').remove();
  var fonts = getSelectFont();
  fonts.forEach(function(element, index) {
    var fontname;
    switch (language) {
      case 'ja':
        fontname = element.displayJa;
        break;
      
      case 'en':
      default:
        fontname = element.displayEn;
        break;
    }
    $('<option value="' + index + '">' + fontname + '</option>').appendTo('#propCharFont');
  });
  $('#propCharFont').val(selectFont);

  $('#language').val(language);
}

/**
 * Get fonts definition object for corresponding to context version
 * @return {object} fonts definition object
 */
function getSelectFont() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return selectFontV1_0_0;
  }
}

/**
 * Apply parameter object to context for corresponding to version
 * @param {object} paramObj parsed parameter object
 */
function applyUrlParameter(paramObj) {
  // this timing context have not version information
  switch(paramObj.v) {
    case '1.0.0':
    default:
      applyUrlParameterV1_0_0(paramObj);
  }
}

/**
 * Apply parameter object to context for version 1.0.0
 * @param {object} paramObj parsed parameter object
 */
function applyUrlParameterV1_0_0(paramObj) {
  var charProp = effectiveProperty.char;
  var stainProp = effectiveProperty.stain;
  var paperProp = effectiveProperty.paper;
  var otherProp = effectiveProperty.other;
  otherProp.version = validateRenderVersion(paramObj.v);
  for (var param in paramObj) {
    switch (param) {
      case 'cn':
        charProp.notation = paramObj[param].substring(0, getLimit().char.notation.max);
        break;
      case 'cf':
        charProp.font = validateInputNumber(paramObj[param], {min: 0, max: getSelectFont().length - 1});
        break;
      case 'cc':
        charProp.count = validateInputNumber(paramObj[param], getLimit().char.count);
        break;
      case 'cs':
        charProp.size = validateInputNumber(paramObj[param], getLimit().char.size);
        break;
      case 'ccl':
        charProp.color = validateColorEnum(paramObj[param]);
        break;
      case 'sc':
        stainProp.count = validateInputNumber(paramObj[param], getLimit().stain.count);
        break;
      case 'ss':
        stainProp.size = validateInputNumber(paramObj[param], getLimit().stain.size);
        break;
      case 'scl':
        stainProp.color = validateColorEnum(paramObj[param]);
        break;
      case 'sb':
        stainProp.bleeding = validateInputNumber(paramObj[param], getLimit().stain.bleeding);
        break;
      case 'ssh':
        var shape = validateShapeEnum(paramObj[param]);
        if (shape) {
          stainProp.shape = shape;
        }
        break;
      case 'ph':
        paperProp.height = validateInputNumber(paramObj[param], getLimit().paper.height);
        break;
      case 'pw':
        paperProp.width = validateInputNumber(paramObj[param], getLimit().paper.width);
        break;
      case 'pcl':
        paperProp.color = validateColorEnum(paramObj[param]);
        break;
      case 'r':
        otherProp.randomSeed = validateInputNumber(paramObj[param], getLimit().other.randomSeed);
        break;
      case 'verbose':
        otherProp.verbose = validateInputNumber(paramObj[param], getLimit().other.verbose);
        break;
      case 'lang':
        otherProp.language = paramObj[param].substring(0, 2);
        break;
    }
  }
}

/**
 * Get limit definition object for corresponding to context version
 * @return {object} limit definition object
 */
function getLimit() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return limitV1_0_0;
  }
}

/**
 * Validate input number (numerical, numeric range)
 * @param {any} rawValue input (taint) number value
 * @param {Object} limitation limit definition at max/min properties
 */
function validateInputNumber(rawValue, limitation) {
  var value = parseInt(Number(rawValue), 10);
  if (value > limitation.max) {
    value = limitation.max;
  }
  if (value < limitation.min) {
    value = limitation.min;
  }
  return value;
}

/**
 * Validate and translate RGBA from comma separated string to object
 * @param {string} rgbEnum comma separated RGBA value enumarated string 
 * @return {object} RGBA property object
 */
function validateColorEnum(rgbEnum) {
  var rgba = {r:0, g:0, b:0, a:0};
  if (rgbEnum) {
    var elements = rgbEnum.split(',');
    if (elements) {
      if (elements[0]) {
        rgba.r = validateInputNumber(elements[0], {min: 0, max: 255});
      }
      if (elements[1]) {
        rgba.g = validateInputNumber(elements[1], {min: 0, max: 255});
      }
      if (elements[2]) {
        rgba.b = validateInputNumber(elements[2], {min: 0, max: 255});
      }
      if (elements[3]) {
        rgba.a = (100 - validateInputNumber(elements[3], {min: 0, max: 100})) / 100;
      }
    }
  }
  return rgba;
}

/**
 * Validate and translate RGBA from comma separated string to object for corresponding to version
 * @param {string} shapeEnum comma separated "stain" shape parameter value enumarated string 
 * @return {Array.Array.<number>} "stain" shape parameter property object
 */
function validateShapeEnum(shapeEnum) {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return validateShapeEnumV1_0_0(shapeEnum);
  }
}

/**
 * Validate and translate RGBA from comma separated string to object for version 1.0.0
 * @param {string} shapeEnum comma separated "stain" shape parameter value enumarated string 
 * @return {Array.Array.<number>} "stain" shape parameter property object
 */
function validateShapeEnumV1_0_0(shapeEnum) {
  var shape = undefined;
  if (shapeEnum) {
    var elements = shapeEnum.split(',');
    if (elements.length == 24) {
      shape = [[],[],[]];
      elements.forEach(function(rawValue, index) {
        var value = parseInt(Number(rawValue), 10);
        shape[Math.floor(Number(index / 8))].push(value);
      });
    }
  }
  return shape;
}

/**
 * Display to UI control from property object for corresponding to version
 * @param {object} prop property object
 */
function displayProperty() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return displayPropertyV1_0_0();
  }
}

/**
 * Display to UI control from property object for version 1.0.0
 */
function displayPropertyV1_0_0() {
  var prop = effectiveProperty;
  $('.propCharCount').val(prop.char.count);
  $('#propCharNotation').val(prop.char.notation);
  $('.propCharSize').val(prop.char.size);
  $('#propCharColor').val(getHexRGB(prop.char.color));
  $('#propCharFont').val(prop.char.font);
  $('.propStainCount').val(prop.stain.count);
  $('.propStainSize').val(prop.stain.size);
  $('#propStainColor').val(getHexRGB(prop.stain.color));
  $('.propStainAlpha').val(100 - prop.stain.color.a * 100);
  $('.propStainBleeding').val(prop.stain.bleeding);
  $('.propPaperHeight').val(prop.paper.height);
  $('.propPaperWidth').val(prop.paper.width);
  $('#propPaperColor').val(getHexRGB(prop.paper.color));
  $('.propOtherRandomSeed').val(prop.other.randomSeed);
  $('#propOtherRenderVersion').val(prop.other.renderVersion);
  if (prop.other.language) {
    $('#language').val(prop.other.language);
    switchLanguage(prop.other.language);
  }
}

/**
 * Display verbose (trivial) UI elements for corresponding to version
 */
function displayVerbose() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return displayVerboseV1_0_0();
  }
}

/**
 * Display verbose (trivial) UI elements for version 1.0.0
 */
function displayVerboseV1_0_0() {
  switch(effectiveProperty.other.verbose) {
    case 1:
      $('#otherProperties').css({
        display: "block"
      })
      break;

    case 0:
    default:
      break;
  }
}

/**
 * Display parameterized replay URL for corresponding version 
 */
function displayReplayUrl() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return displayReplayUrlV1_0_0();
  }
}

/**
 * Display parameterized replay URL for version 1.0.0
 */
function displayReplayUrlV1_0_0() {
  var url = location.href.split('?')[0];
  var prop = effectiveProperty;
  var params = [];
  params.push(['cn', encodeURIComponent(prop.char.notation)]);
  params.push(['cf', prop.char.font]);
  params.push(['cc', prop.char.count]);
  params.push(['cs', prop.char.size]);
  params.push(['ccl', colorToString(prop.char.color)]);
  params.push(['sc', prop.stain.count]);
  params.push(['ss', prop.stain.size]);
  params.push(['scl', colorToString(prop.stain.color)]);
  params.push(['sb', prop.stain.bleeding]);
  switch (prop.other.verbose) {
    case 1:
      // [[A,B],[C,D]] -> A,B,C,D
      params.push(['ssh', prop.stain.shape.map(function(element) {
        return element.reduce(function(prev, current) {
          return prev + ',' + current;
        })
      }).reduce(function(prev, current) {
        return prev + ',' + current;
      })]);
      break;

    case 0:
    default:
      break;
  }
  params.push(['ph', prop.paper.height]);
  params.push(['pw', prop.paper.width]);
  params.push(['pcl', colorToString(prop.paper.color)]);
  params.push(['r', prop.other.randomSeed]);
  params.push(['v', prop.other.renderVersion]);
  // [[A,B],[C,D]] => A=B&C=D
  var paramsExpand = params.map(function(element) {
    return element.reduce(function(prev, current) {
      return prev + '=' + current;
    })
  }).reduce(function(prev, current) {
    return prev + '&' + current;
  });
  $('#replayURL').val(url + '?' + paramsExpand);
}

/*
 * Rendering core functions 
 */

/**
 * Rendaring all parameterized elements for corresponding version
 */
function render() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      renderV1_0_0();
      break;
  }
}

/**
 * Rendaring all parameterized elements for version 1.0.0
 */
function renderV1_0_0() {
  var charProp = effectiveProperty.char;
  var stainProp = effectiveProperty.stain;
  renderPaperStyle();
  loading(true);
  setTimeout(function() {
    var random = xorshift32(effectiveProperty.other.randomSeed);
    var elementLiteralTotal = renderRawChar(0, charProp.count, undefined);
    // discard random seed value from random
    random = xorshift32(effectiveProperty.other.randomSeed);
    elementLiteralTotal += renderRawStain(0, stainProp.count, undefined);
    $(elementLiteralTotal).appendTo('#paper');
    renderCharStyle();
    renderStainStyle();
    loading(false);
  }, 0);
}

/**
 * Rendering "paper" properties style for corresponding version
 */
function renderPaperStyle() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      renderPaperStyleV1_0_0();
      break;
  }
}

/**
 * Rendering "paper" properties style for version 1.0.0
 */
function renderPaperStyleV1_0_0() {
  var paperProp = effectiveProperty.paper;
  $('#paper').css({
    "height": paperProp.height + 'px',
    "width": paperProp.width + 'px',
    "backgroundColor": getStyleLiteralFromRGB(paperProp.color)
  });
  var cssload = $('.cssload-wrapper');
  var cssloadHeight = cssload.height();
  var cssloadWidth = cssload.width();
  cssload.css({
    top: (paperProp.height - cssloadHeight) / 2 + 'px',
    left: (paperProp.width - cssloadWidth) / 2 + 'px'
  });
}

/**
 * Rendering "char" properties element for corresponding version
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 */
function renderChar(start, end, random) {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      renderCharV1_0_0(start, end, random);
      break;
  }
}

/**
 * Rendering "char" properties element for version 1.0.0
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 */
function renderCharV1_0_0(start, end, random) {
  loading(true);
  setTimeout(function() {
    $(renderRawChar(start, end, random)).appendTo('#paper');
    renderCharStyle();
    loading(false);
  }, 0);
}

/**
 * Only HTML tag literal rendering "char" properties element for corresponding version
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 * @return {string} HTML tag literal
 */
function renderRawChar(start, end, random) {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return renderRawCharV1_0_0(start, end, random);
  }
}

/**
 * Only HTML tag literal rendering "char" properties element for version 1.0.0
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 * @return {string} HTML tag literal
 */
function renderRawCharV1_0_0(start, end, random) {
  if (!random) {
    // discard random seed value from random
    random = xorshift32(effectiveProperty.other.randomSeed);
  }
  var charProp = effectiveProperty.char;
  var paperProp = effectiveProperty.paper;
  $('#measure').css({
    fontSize: effectiveProperty.char.size + 'pt',
  });
  var charHeight = $('#measure').text(charProp.notation).get(0).offsetHeight;
  var charWidth = $('#measure').text(charProp.notation).get(0).offsetWidth;

  var raw = '';
  for (var i = start; i < end; i++) {
    var renderCharId = 'renderCharIndex' + i;
    var top = adjustScale(random = xorshift32(random), charHeight, paperProp.height);
    var left = adjustScale(random = xorshift32(random), charWidth, paperProp.width);
    context.charRandom.push(random);
    raw += '<div id="' + renderCharId
    + '" class="renderChar" style="top: ' + top + 'px; left: ' + left + 'px;">'
    + charProp.notation
    + '</div>';
  }
  return raw;
}

/**
 * Rendering "char" properties style for corresponding version
 */
function renderCharStyle() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      renderCharStyleV1_0_0();
      break;
  }
}

/**
 * Rendering "char" properties style for version 1.0.0
 */
function renderCharStyleV1_0_0() {
  var charProp = effectiveProperty.char;
  $('.renderChar').css({
    fontFamily: getSelectFont()[charProp.font].style,
    fontSize: charProp.size + 'pt',
    color: getStyleLiteralFromRGB(charProp.color)
  });
}

/**
 * Rendering "stain" properties element for corresponding version
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 */
function renderStain(start, end, random) {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      renderStainV1_0_0(start, end, random);
      break;
  }
}

/**
 * Rendering "stain" properties element for version 1.0.0
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 */
function renderStainV1_0_0(start, end, random) {
  loading(true);
  setTimeout(function() {
    $(renderRawStain(start, end, random)).appendTo('#paper');
    renderStainStyle();
    loading(false);
  }, 0);
}

/**
 * Only HTML tag literal rendering "stain" properties element for corresponding version
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 * @return {string} HTML tag literal
 */
function renderRawStain(start, end, random) {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      return renderRawStainV1_0_0(start, end, random);
  }
}

/**
 * Only HTML tag literal rendering "stain" properties element for version 1.0.0
 * @param {number} start first index of element for rendering
 * @param {number} end last index of element for rendering
 * @param {number} random previous random number (if "undefined" specified, then use randomSeed property)
 * @return {string} HTML tag literal
 */
function renderRawStainV1_0_0(start, end, random) {
  if (!random) {
    // discard random seed value from random
    random = xorshift32(effectiveProperty.other.randomSeed);
  }
  var stainProp = effectiveProperty.stain;
  var paperProp = effectiveProperty.paper;

  var raw = '';
  for (var i = start ; i < end; i++) {
    var scale = adjustScale(random = xorshift32(random), 0, 100) / 100;
    var size = trunc(stainProp.size * scale);
    var top = adjustScale(random = xorshift32(random), size, paperProp.height);
    var left = adjustScale(random = xorshift32(random), size, paperProp.width);
    context.stainRandom.push(random);
    raw += '<div class="renderStain stainShape' + (i % stainProp.shape.length) + '" '
    + 'style="top: ' + top + 'px; left: ' + left + 'px; height: ' + size + 'px; width: ' + size + 'px;">'
    + '</div>';
  }
  return raw;
}

/**
 * Rendering "stain" properties style for corresponding version
 */
function renderStainStyle() {
  switch (effectiveProperty.other.renderVersion) {
    case '1.0.0':
    default:
      renderStainStyleV1_0_0();
      break;
  }
}

/**
 * Rendering "stain" properties style for version 1.0.0
 */
function renderStainStyleV1_0_0() {
  var stainProp = effectiveProperty.stain;
  $('.renderStain').css({
    backgroundColor: getStyleLiteralFromRGBA(stainProp.color)
  });
  var bleeding = effectiveProperty.stain.bleeding;
  var r = trunc((255 - effectiveProperty.stain.color.r) / 8);
  var g = trunc((255 - effectiveProperty.stain.color.g) / 8);
  var b = trunc((255 - effectiveProperty.stain.color.b) / 8);
  var a = effectiveProperty.stain.color.a;
  for (var i = 0; i < stainProp.shape.length; i++) {
    $('.stainShape' + i).css({
      borderRadius: getStyleLiteralFromShape(stainProp.shape[i]),
      boxShadow: '0 0 '
        + bleeding + 'px '
        + bleeding + 'px '
        + 'rgba('
        + r + ', '
        + g + ', '
        + b + ', '
        + a + ') inset'
    });
  }
}

/**
 * Clear "char" DOM elements
 */
function clearChar() {
  $('.renderChar').remove();
  context.charRandom = [];
}

/**
 * Clear "stain" DOM elements
 */
function clearStain() {
  $('.renderStain').remove();
  context.stainRandom = [];
}

/*
 * Utility functions
 */

/**
 * Get RGB hexadecimal literal(#FFFFFF) from each RGB value
 * @param {number} r R of RGB
 * @param {number} g G of RGB
 * @param {number} b B of RGB
 * @return {string} '#FFFFFF' format RGB literal
 */
function getHexRGB(colorObj) {
  return '#'
  + ('0' + colorObj.r.toString(16).toUpperCase()).slice(-2)
  + ('0' + colorObj.g.toString(16).toUpperCase()).slice(-2)
  + ('0' + colorObj.b.toString(16).toUpperCase()).slice(-2);
}

/**
 * Parse and translate from RGB hexadecimal literal(#FFFFFF) to object
 * @param {string} rgb '#FFFFFF' format RGB literal
 * @return {object} RGB property object
 */
function parseHexRGB(rgb) {
  var r = rgb.slice(1, 3);
  var g = rgb.slice(3, 5);
  var b = rgb.slice(5, 7);
  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16)
  };
}

/**
 * Get style literal "rgb(<r>,<g>,<b>)" from color property object
 * @param {object} rgb color perperty object
 * @return {string} style literal "rgb(<r>,<g>,<b>)"
 */
function getStyleLiteralFromRGB(colorObj) {
  return 'rgb(' + getStyleLiteralFragmentFromRGB(colorObj) + ')';
}

/**
 * Get style literal "rgba(<r>,<g>,<b>,<a>)" from color property object
 * @param {object} rgb color perperty object
 * @return {string} style literal "rgba(<r>,<g>,<b>,<a>)"
 */
function getStyleLiteralFromRGBA(colorObj) {
  return 'rgba(' + getStyleLiteralFragmentFromRGB(colorObj) + ',' + colorObj.a + ')';
}

/**
 * Get style literal fragment "<r>,<g>,<b>" from color property object
 * @param {object} rgb color perperty object
 * @return {string} style literal "<r>,<g>,<b>"
 */
function getStyleLiteralFragmentFromRGB(colorObj) {
  return colorObj.r + ',' + colorObj.g + ',' + colorObj.b;
}

/**
 * Get style literal "<n0>% <n1>% <n2>% <n3>% / <n4>% <n5%> <n6>% <n7%>" from shape property array
 * @param {Array.<nubmer>} shapeArray shape perperty array (assumption for 8 elements)
 * @return {string} style literal "<n0>% <n1>% <n2>% <n3>% / <n4>% <n5%> <n6>% <n7%>"
 */
function getStyleLiteralFromShape(shapeArray) {
  return shapeArray.slice(0, 4).map(function(v) { return v + '%' }).join(' ')
   + ' / ' + shapeArray.slice(4, 8).map(function(v) { return v + '%' }).join(' ');
}

/**
 * Show/Hide loading animation for long time procedure (massive rendering)
 * @param {boolean} isShow true:show animation, false:hide animation
 */
function loading(isShow) {
  if (isShow) {
    $('.cssload-wrapper').addClass('cssload-wrapper-on');
  } else {
    $('.cssload-wrapper').removeClass('cssload-wrapper-on');
  }
}

/**
 * Xorshift (32-bit) algorythm for generate pseudo random numbers
 * @param {number} prev random seed (previous generated preudo random number)
 */
function xorshift32(prev) {
  if (!prev) {
    prev = 8452460; // does not mean in value
  }
  var x = prev;
  x = x ^ (x << 13);
  x = x ^ (x >>> 17);
  x = x ^ (x << 5);
  return x;
}

/**
 * Adjustment (32bit signed integer random) value to drawing area coordinate
 * @param {number} value adjustment source value (32bit signed integer random number)
 * @param {number} adjust adjustment value (display object size for zero axis)
 * @param {number} limit max number of adjustment target coordinate
 */
function adjustScale(value, adjust, limit) {
  return trunc(value / Math.pow(2, 32) * (limit - adjust) + (limit - adjust) / 2);
}

/**
 * Truncate decimal fraction (Math.trunc() polyfill)
 * @param {number} value 
 */
function trunc(value) {
  var integer = 0;
  if (value < 0) {
    integer = Math.ceil(value);
  } else {
    integer = Math.floor(value);
  }
  return integer;
}

/**
 * Convert to parameter literal fragment "<r>,<g>,<b>[,<a>]" from color property object
 * @param {object} color color perperty object
 * @return {string} parameter literal "<r>,<g>,<b>[,<a>]" (<a> is percentile to reverse alpha)
 */
function colorToString(color) {
  //var str = color.r + ',' + color.g + ',' + color.b;
  var str = getStyleLiteralFragmentFromRGB(color);
  if (color.a) {
    str += ',' + (100 - (color.a * 100));
  }
  return str;
}

/*
 * Event handlers
 */

/**
 * Browser window initial loading and resize
 */
$(window).on('load resize', function() {
  adjustLayout();
});

/**
 * Select UI language change
 */
$('#language').on('change', function() {
  var language = $(this).val();
  effectiveProperty.other.language = language;
  switchLanguage(language);
});

/**
 * "Download" button click
 */
$('#toImage').on('click', function() {
  // workaround: html2canvas generate canvas background affected by box-shadow
  var paperBoxShadow = $('#paper').css('box-shadow');
  // clear box-shadow temporary
  $('#paper').css('box-shadow', 'none');
  // workaround: html2canvas generate invret inset overlay color affected by box-shadow and inset
  var stainBoxShadow = $('.renderStain').css('box-shadow');
  // clear box-shadow temporary
  $('.renderStain').css('box-shadow', 'none');
  html2canvas(document.querySelector('#paper')).then(function(canvas) {
    // restore box-shadow value
    $('#paper').css('box-shadow', paperBoxShadow);
    // restore box-shadow value
    $('.renderStain').css('box-shadow', stainBoxShadow);
    var mimeType = 'image/png';
    var filename = 'F.png';
    var base64data = canvas.toDataURL(mimeType);
    var bindata = window.atob(base64data.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bindata.length);
    for (var i = 0; i < bindata.length; i++) {
      buffer[i] = bindata.charCodeAt(i);
    }
    var blob = new Blob([buffer.buffer], {
      type: mimeType
    });
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else if (window.URL && window.URL.createObjectURL) {
      var a = document.createElement('a');
      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      window.open(base64data, '_blank');
    }
  });
});

/**
 * Properties -> Char -> Notation input
 */
$('#propCharNotation').on('input', function() {
  // initialize for repeatability (adjustment for right and bottom)
  //$('.renderChar').text($(this).val());
  var value = $(this).val();
  if (value.length > getLimit().char.notation.max) {
    value.substring(0, getLimit().char.notation.max);
    $(this).val(value);
  }
  effectiveProperty.char.notation = value;
  clearChar();
  renderChar(0, effectiveProperty.char.count, undefined);
  displayReplayUrl();
});

/**
 * Properties -> Char -> Font change
 */
$('#propCharFont').on('change', function() {
  var current = validateInputNumber($(this).val(), {min: 0, max: getSelectFont().length - 1});
  var prev = effectiveProperty.char.font;
  if (prev != current) {
    effectiveProperty.char.font = current;
    // initialize for repeatability (adjustment for right and bottom)
    clearChar();
    renderChar(0, effectiveProperty.char.count, undefined);
    displayReplayUrl();
  }
});

/**
 * Properties -> Char -> Count input
 * ('change' event for IE)
 */
$('.propCharCount').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().char.count);
  $('.propCharCount').val(current);
  var prev = effectiveProperty.char.count;
  if (prev < current) {
    renderChar(prev, current, context.charRandom[context.charRandom.length - 1]);
  } else if (prev > current) {
    loading(true);
    setTimeout(function() {
      if (current > 0) {
        $('.renderChar').eq(current - prev - 1).nextAll('.renderChar').remove();
      } else {
        $('.renderChar').remove();
      }
      context.charRandom.splice(current);
      loading(false);
    }, 0);
  }
  effectiveProperty.char.count = current;
  displayReplayUrl();
});

/**
 * Properties -> Char -> Size input
 * ('change' event for IE)
 */
$('.propCharSize').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().char.size);
  $('.propCharSize').val(current);
  var prev = effectiveProperty.char.size;
  if (prev != current) {
    // initialize for rendering result repeatability (adjustment for right and bottom)
    effectiveProperty.char.size = current;
    clearChar();
    renderChar(0, effectiveProperty.char.count, undefined);
    displayReplayUrl();
  }
});

/**
 * Properties -> Char -> Color change
 */
$('#propCharColor').on('change', function() {
  var color = parseHexRGB($(this).val());
  effectiveProperty.char.color = color;
  renderCharStyle();
  displayReplayUrl();
});

/**
 * Properties -> Stain -> Count input
 * ('change' event for IE)
 */
$('.propStainCount').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().stain.count);
  $('.propStainCount').val(current);
  var prev = effectiveProperty.stain.count;
  if (prev < current) {
    renderStain(prev, current, context.stainRandom[context.stainRandom.length - 1]);
  } else if (prev > current) {
    loading(true);
    setTimeout(function() {
      if (current > 0) {
        $('.renderStain').eq(current - prev - 1).nextAll('.renderStain').remove();
      } else {
        $('.renderStain').remove();
      }
      context.stainRandom.splice(current);
      loading(false);
    }, 0);
  }
  effectiveProperty.stain.count = current;
  displayReplayUrl();
});

/**
 * Properties -> Stain -> Size input
 * ('change' event for IE)
 */
$('.propStainSize').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().stain.size);
  $('.propStainSize').val(current);
  var prev = effectiveProperty.stain.size;
  if (prev != current) {
    // initialize for repeatability (adjustment for right and bottom)
    effectiveProperty.stain.size = current;
    clearStain();
    renderStain(0, effectiveProperty.stain.count, undefined);
    displayReplayUrl();
  }
});

/**
 * Properties -> Stain -> Color change
 */
$('#propStainColor').on('change', function() {
  var color = parseHexRGB($(this).val());
  // keep stain.color.a
  effectiveProperty.stain.color.r = color.r;
  effectiveProperty.stain.color.g = color.g;
  effectiveProperty.stain.color.b = color.b;
  renderStainStyle();
  displayReplayUrl();
});

/**
 * Properties -> Stain -> Clarity input
 * ('change' event for IE)
 */
$('.propStainAlpha').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().stain.alpha);
  $('.propStainAlpha').val(current);
  var prev = effectiveProperty.stain.color.a;
  current = (100 - current) / 100;
  if (prev != current) {
    effectiveProperty.stain.color.a = current;
    renderStainStyle();
    displayReplayUrl();
  }
});

/**
 * Properties -> Stain -> Bleeding input
 * ('change' event for IE)
 */
$('.propStainBleeding').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().stain.bleeding);
  $('.propStainBleeding').val(current);
  var prev = effectiveProperty.stain.bleeding;
  if (prev != current) {
    effectiveProperty.stain.bleeding = current;
    renderStainStyle();
    displayReplayUrl();
  }
});

/**
 * Properties -> Paper -> Height input
 * ('change' event for IE)
 */
$('.propPaperHeight').on('input change', function() {
  var current = validateInputNumber($(this).val(), {min: 0, max: getLimit().paper.height.max});
  $('.propPaperHeight').val(current);
  if (current >= getLimit().paper.height.min) {
    var prev = effectiveProperty.paper.height;
    if (prev != current) {
      // initialize for rendering result repeatability (relative position for char and stain)
      effectiveProperty.paper.height = current;
      clearChar();
      clearStain();
      render();
      displayReplayUrl();
    }
  }
});

/**
 * Properties -> Paper -> Width input
 * ('change' event for IE)
 */
$('.propPaperWidth').on('input change', function() {
  var current = validateInputNumber($(this).val(), {min: 0, max: getLimit().paper.width.max});
  $('.propPaperWidth').val(current);
  if (current >= getLimit().paper.width.min) {
    var prev = effectiveProperty.paper.width;
    if (prev != current) {
      adjustLayout();
      // initialize for rendering result repeatability (relative position for char and stain)
      effectiveProperty.paper.width = current;
      clearChar();
      clearStain();
      render();
      displayReplayUrl();
    }
  }
});

/**
 * Properties -> Paper -> Color input
 */
$('#propPaperColor').on('change', function() {
  var color = parseHexRGB($(this).val());
  effectiveProperty.paper.color = color;
  renderPaperStyle();
  displayReplayUrl();
});

/**
 * Properties -> Other -> Random input
 * ('change' event for IE)
 */
$('.propOtherRandomSeed').on('input change', function() {
  var current = validateInputNumber($(this).val(), getLimit().other.randomSeed);
  $('.propOtherRandomSeed').val(current);
  var prev = effectiveProperty.other.randomSeed;
  if (prev != current) {
    effectiveProperty.other.randomSeed = current;
    clearChar();
    clearStain();
    render();
    displayReplayUrl();
  }
});

/**
 * Properties -> Other -> Version input
 */
$('#propOtherRenderVersion').on('input', function() {
  var current = validateRenderVersion($(this).val());
  $('.propOtherRenderVersion').val(current);
  var prev = effectiveProperty.other.renderVersion;
  if (prev != current) {
    effectiveProperty.other.renderVersion = current;
    clearChar();
    clearStain();
    render();
  }
  displayReplayUrl();
});

/**
 * Replay URL -> Copy button click
 */
$('#copyReplayURL').on('click', function() {
  var workReplayURL = $('#replayURL').clone();
  workReplayURL.css({
    top: "-2000px",
    left: "-2000px",
  })
  workReplayURL.appendTo('body');
  workReplayURL.select();
  document.execCommand("copy");
  workReplayURL.remove();
  $('#copiedBalloon').addClass('copiedBalloon-fadeout');
  setTimeout(function() {
    $('#copiedBalloon').removeClass('copiedBalloon-fadeout');
  }, 3000);
});
