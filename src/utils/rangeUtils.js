import isString from 'lodash/isString'
import includes from 'lodash/includes'
import {
  LINKED_CLASS,
  NESTED_OBJECT,

  TEXT,
  NUMBER,
  BOOLEAN,
  DATE,
  DATE_DATETIME,
  ENUM,

  NUMBER_INTEGER

 } from '../constants/rangeConstants'

/* Should delete this and the isRange* methods below */
export function createRange (rangeType) {
  const range = {}
  if (rangeType === LINKED_CLASS) {
    range.type = LINKED_CLASS
    range.classId = null
  } else if (rangeType === NESTED_OBJECT) {
    range.type = NESTED_OBJECT
    range.propertyRefs = []
  }
  return range
}

export function isRangeLinkedClass ($$range) {
  return $$range.get('type') === LINKED_CLASS
}
export function isRangeNestedObject ($$range) {
  return $$range.get('type') === NESTED_OBJECT
}
export function isRangeDataType ($$range) {
  const type = $$range.get('type')
  return isString(type)
    && type !== LINKED_CLASS
    && type !== NESTED_OBJECT
}

export function getDisplayLabel (range) {
  const { type } = range

  switch (type) {
    case LINKED_CLASS:
      throw new Error('Should display className instead of linkedClass')

    case NESTED_OBJECT:
      return NESTED_OBJECT

    case TEXT:
      if (range.format) {
        return range.format
      }
      return TEXT

    case NUMBER:
      if (range.format) {
        return range.format
      }
      return NUMBER

    case BOOLEAN:
      return BOOLEAN

    case DATE:
      if (range.format) {
        return range.format
      }
      return DATE_DATETIME

    case ENUM:
      return ENUM

    default:
      throw new Error(`Bad range type given: ${type}`)
  }
}

/* This function ensures the range only has meta properties that are relevant
to the selected type */
function _cleanKeys (range, keys) {
  const allowed = keys.concat('type')
  return Object.keys(range).reduce((prev, next) => {
    if (includes(allowed, next)) {
      prev[next] = range[next]
    }
    return prev
  }, {})
}

export function cleanRange (range) {
  const { type } = range

  switch (type) {
    case LINKED_CLASS: return _cleanKeys(range, ['ref'])
    case NESTED_OBJECT: return _cleanKeys(range, ['propertyRefs'])
    case TEXT: return _cleanKeys(range, ['format', 'regex', 'minLength', 'maxLength'])
    case NUMBER: return _cleanKeys(range, ['format', 'min', 'max'])
    case BOOLEAN: return _cleanKeys(range, [])
    case DATE: return _cleanKeys(range, ['format'])
    case ENUM: return _cleanKeys(range, ['values'])
    default:
      throw new Error(`Bad range type given: ${type}`)
  }
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
