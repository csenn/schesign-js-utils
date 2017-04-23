'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRange = validateRange;
exports.validateProperty = validateProperty;
exports.validateDesignName = validateDesignName;
exports.validateOrgName = validateOrgName;
exports.validateClassName = validateClassName;
exports.validatePropertyName = validatePropertyName;
exports.validateUsername = validateUsername;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _rangeConstants = require('../constants/rangeConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://stackoverflow.com/questions/2103596/regex-that-matches-camel-and-pascal-case
// const SNAKE_CASE = /^[a-z0-9_]+$/
// const PASCAL_CASE = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/
// const CAMEL_CASE = /^[a-z]+(?:[A-Z][a-z]+)*$/

var SNAKE_CASE = /^[a-z0-9_]+$/;
var PASCAL_CASE = /^[a-zA-Z0-9]+$/;
var CAMEL_CASE = /^[a-zA-Z0-9]+$/;

// const LETTERS_UNDERSCORE = /^[a-zA-Z0-9_]+$/
var LETTERS_NUMBERS_UNDERSCORE = /^[a-zA-Z0-9_]+$/;
var LETTERS_NUMBERS_UNDERSCORE_DASH = /^[a-zA-Z0-9_-]+$/;

var EMAIL = /.+@.+/;

function validateRange(range) {
  var type = range.type;

  var validTypes = [_rangeConstants.LINKED_CLASS, _rangeConstants.NESTED_OBJECT, _rangeConstants.TEXT, _rangeConstants.NUMBER, _rangeConstants.BOOLEAN, _rangeConstants.DATE, _rangeConstants.ENUM];
  if (!(0, _includes2.default)(validTypes, type)) {
    return 'Property must have a valid type';
  }
  if (type === _rangeConstants.LINKED_CLASS) {
    if (!range.classId) {
      return 'A linked class property must point to a valid class';
    }
  }
  if (type === _rangeConstants.ENUM) {
    if (!range.values || range.values.length === 0) {
      return 'An enum property must have valid values';
    }
  }
  return null;
}

// Todo: make this better
function validateProperty(property, design) {
  if (!design) {
    throw new Error('A design is required');
  }

  var nameError = validatePropertyName(property.name, design);
  if (nameError) {
    return nameError;
  }

  var err = validateRange(property.range);
  if (err) {
    return err;
  }
  return null;
}

function validateDesignName(designName) {
  if (!(0, _isString2.default)(designName)) {
    throw new Error('designName should be a string');
  }
  if (!LETTERS_NUMBERS_UNDERSCORE_DASH.test(designName)) {
    return 'Design name can have letters, numbers, dashes, and underscores. Spaces are not allowed.';
  }
  return null;
}

function validateOrgName(orgName) {
  if (!(0, _isString2.default)(orgName)) {
    throw new Error('orgName should be a string');
  }
  if (!LETTERS_NUMBERS_UNDERSCORE_DASH.test(orgName)) {
    return 'Org name can have letters, numbers, dashes, and underscores. Spaces are not allowed.';
  }
  return null;
}

/* Returns an error string or null */
function validateClassName(className, design) {
  if (!design) {
    throw new Error('A design is required');
  }
  var classNamingConvention = design.classNamingConvention;

  if (classNamingConvention === 'snakeCase' && !SNAKE_CASE.test(className)) {
    return 'Name not valid snake_case';
  } else if (classNamingConvention === 'pascalCase' && !PASCAL_CASE.test(className)) {
    return 'Name not valid PascalCase';
  } else if (!LETTERS_NUMBERS_UNDERSCORE.test(className)) {
    return 'Class names can only have letters, numbers, and underscores';
  }
  return null;
}

/* Returns an error string or null */
function validatePropertyName(propertyName, design) {
  if (!design) {
    throw new Error('A design is required');
  }
  var classNamingConvention = design.classNamingConvention;

  if (!propertyName) {
    return 'Property name is required';
  } else if (classNamingConvention === 'snakeCase' && !SNAKE_CASE.test(propertyName)) {
    return 'Property name not valid snake_case';
  } else if (classNamingConvention === 'camelCase' && !CAMEL_CASE.test(propertyName)) {
    return 'Property name not valid camelCase';
  } else if (!LETTERS_NUMBERS_UNDERSCORE.test(propertyName)) {
    return 'PropertyProperty names can only have letters, numbers, and underscores';
  }
  return null;
}

function validateUsername(userName) {
  if (!(0, _isString2.default)(userName)) {
    throw new Error('userName should be a string');
  }
  if (!LETTERS_NUMBERS_UNDERSCORE.test(userName)) {
    return 'Username can have letters, numbers, and underscores';
  }
  if (userName.length < 4) {
    return 'Username must be at least 4 characters';
  }
  return null;
}

function validateEmail(email) {
  if (!EMAIL.test(email)) {
    return 'Email address must contain an @ symbol';
  }
  return null;
}

function validatePassword(password) {
  if (!(0, _isString2.default)(password)) {
    throw new Error('userName should be a string');
  }
  if (password.length < 5) {
    return 'Password must be at least 5 characters';
  }
  return null;
}