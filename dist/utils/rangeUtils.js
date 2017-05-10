'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRange = createRange;
exports.isRangeLinkedClass = isRangeLinkedClass;
exports.isRangeNestedObject = isRangeNestedObject;
exports.isRangeDataType = isRangeDataType;
exports.getDisplayLabel = getDisplayLabel;
exports.cleanRange = cleanRange;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _includes = require('lodash/includes');

var _includes2 = _interopRequireDefault(_includes);

var _rangeConstants = require('../constants/rangeConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Should delete this and the isRange* methods below */
function createRange(rangeType) {
  var range = {};
  if (rangeType === _rangeConstants.LINKED_CLASS) {
    range.type = _rangeConstants.LINKED_CLASS;
    range.classId = null;
  } else if (rangeType === _rangeConstants.NESTED_OBJECT) {
    range.type = _rangeConstants.NESTED_OBJECT;
    range.propertyRefs = [];
  }
  return range;
}

function isRangeLinkedClass($$range) {
  return $$range.get('type') === _rangeConstants.LINKED_CLASS;
}
function isRangeNestedObject($$range) {
  return $$range.get('type') === _rangeConstants.NESTED_OBJECT;
}
function isRangeDataType($$range) {
  var type = $$range.get('type');
  return (0, _isString2.default)(type) && type !== _rangeConstants.LINKED_CLASS && type !== _rangeConstants.NESTED_OBJECT;
}

function getDisplayLabel(range) {
  var type = range.type;


  switch (type) {
    case _rangeConstants.LINKED_CLASS:
      throw new Error('Should display className instead of linkedClass');

    case _rangeConstants.NESTED_OBJECT:
      return _rangeConstants.NESTED_OBJECT;

    case _rangeConstants.TEXT:
      if (range.format) {
        return range.format;
      }
      return _rangeConstants.TEXT;

    case _rangeConstants.NUMBER:
      if (range.format) {
        return range.format;
      }
      return _rangeConstants.NUMBER;

    case _rangeConstants.BOOLEAN:
      return _rangeConstants.BOOLEAN;

    case _rangeConstants.DATE:
      if (range.format) {
        return range.format;
      }
      return _rangeConstants.DATE_DATETIME;

    case _rangeConstants.ENUM:
      return _rangeConstants.ENUM;

    default:
      throw new Error('Bad range type given: ' + type);
  }
}

/* This function ensures the range only has meta properties that are relevant
to the selected type */
// function _cleanKeys (range, keys) {
//   const allowed = keys.concat('type')
//   return Object.keys(range).reduce((prev, next) => {
//     if (includes(allowed, next)) {
//       prev[next] = range[next]
//     }
//     return prev
//   }, {})
// }

function cleanRange(range) {
  throw new Error('Deprecated');
  // const { type } = range

  // switch (type) {
  //   case LINKED_CLASS: return _cleanKeys(range, ['ref'])
  //   case NESTED_OBJECT: return _cleanKeys(range, ['propertyRefs'])
  //   case TEXT: return _cleanKeys(range, ['format', 'regex', 'minLength', 'maxLength'])
  //   case NUMBER: return _cleanKeys(range, ['format', 'min', 'max'])
  //   case BOOLEAN: return _cleanKeys(range, [])
  //   case DATE: return _cleanKeys(range, ['format'])
  //   case ENUM: return _cleanKeys(range, ['values'])
  //   default:
  //     throw new Error(`Bad range type given: ${type}`)
  // }
}

// What can ranges look like ?
/*
{
  type: 'string',
  pattern: '',
  minLength: 2, // Maybe skip
  maxLength: 3  // Maybe skip
}
{
  type: 'integer',
  min max
}
{
  type: 'number',
  minimum: 0,
  maximum: 100,
}
{
  type: array,
  minItems: 2,
  maxItems: 3
  uniqueItems: true
}

*/