'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceUrl = reduceUrl;
exports.isNumber = isNumber;
exports.isRequiredCardinality = isRequiredCardinality;
exports.isMultipleCardinality = isMultipleCardinality;
/* Speical types */
var LINKED_CLASS = exports.LINKED_CLASS = 'LinkedClass';
var NESTED_OBJECT = exports.NESTED_OBJECT = 'NestedObject';

/* Main Primitives */
var TEXT = exports.TEXT = 'Text';
var NUMBER = exports.NUMBER = 'Number';
var BOOLEAN = exports.BOOLEAN = 'Boolean';
var DATE = exports.DATE = 'Date';
var ENUM = exports.ENUM = 'Enum';

var TEXT_FORMAT_URL = exports.TEXT_FORMAT_URL = 'Url';
var TEXT_FORMAT_EMAIL = exports.TEXT_FORMAT_EMAIL = 'Email';
var TEXT_FORMAT_HOSTNAME = exports.TEXT_FORMAT_HOSTNAME = 'Hostname';

var DATE_SHORT = exports.DATE_SHORT = 'ShortDate';
var DATE_DATETIME = exports.DATE_DATETIME = 'DateTime';
var DATE_TIME = exports.DATE_TIME = 'Time';

var NUMBER_INT = exports.NUMBER_INT = 'Int';
var NUMBER_INT_8 = exports.NUMBER_INT_8 = 'Int8';
var NUMBER_INT_16 = exports.NUMBER_INT_16 = 'Int16';
var NUMBER_INT_32 = exports.NUMBER_INT_32 = 'Int32';
var NUMBER_INT_64 = exports.NUMBER_INT_64 = 'Int64';

function reduceUrl(url) {
  return url.substring(url.indexOf('schesign.com'));
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function isRequiredCardinality(cardinality) {
  return cardinality.minItems > 0;
}

function isMultipleCardinality(cardinality) {
  return !isNumber(cardinality.maxItems) || cardinality.maxItems > 1;
}