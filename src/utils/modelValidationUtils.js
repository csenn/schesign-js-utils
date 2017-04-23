import isString from 'lodash/isString'
import includes from 'lodash/includes'
import {
  LINKED_CLASS,
  NESTED_OBJECT,
  TEXT,
  NUMBER,
  BOOLEAN,
  DATE,
  ENUM
 } from '../constants/rangeConstants'

// http://stackoverflow.com/questions/2103596/regex-that-matches-camel-and-pascal-case
// const SNAKE_CASE = /^[a-z0-9_]+$/
// const PASCAL_CASE = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/
// const CAMEL_CASE = /^[a-z]+(?:[A-Z][a-z]+)*$/

const SNAKE_CASE = /^[a-z0-9_]+$/
const PASCAL_CASE = /^[a-zA-Z0-9]+$/
const CAMEL_CASE = /^[a-zA-Z0-9]+$/

// const LETTERS_UNDERSCORE = /^[a-zA-Z0-9_]+$/
const LETTERS_NUMBERS_UNDERSCORE = /^[a-zA-Z0-9_]+$/
const LETTERS_NUMBERS_UNDERSCORE_DASH = /^[a-zA-Z0-9_-]+$/

const EMAIL = /.+@.+/

export function validateRange (range) {
  const { type } = range
  const validTypes = [
    LINKED_CLASS,
    NESTED_OBJECT,
    TEXT,
    NUMBER,
    BOOLEAN,
    DATE,
    ENUM
  ]
  if (!includes(validTypes, type)) {
    return 'Property must have a valid type'
  }
  if (type === LINKED_CLASS) {
    if (!range.classId) {
      return 'A linked class property must point to a valid class'
    }
  }
  if (type === ENUM) {
    if (!range.values || range.values.length === 0) {
      return 'An enum property must have valid values'
    }
  }
  return null
}

// Todo: make this better
export function validateProperty (property, design) {
  if (!design) {
    throw new Error('A design is required')
  }

  const nameError = validatePropertyName(property.name, design)
  if (nameError) {
    return nameError
  }

  const err = validateRange(property.range)
  if (err) {
    return err
  }
  return null
}

export function validateDesignName (designName) {
  if (!isString(designName)) {
    throw new Error('designName should be a string')
  }
  if (!LETTERS_NUMBERS_UNDERSCORE_DASH.test(designName)) {
    return 'Design name can have letters, numbers, dashes, and underscores. Spaces are not allowed.'
  }
  return null
}

export function validateOrgName (orgName) {
  if (!isString(orgName)) {
    throw new Error('orgName should be a string')
  }
  if (!LETTERS_NUMBERS_UNDERSCORE_DASH.test(orgName)) {
    return 'Org name can have letters, numbers, dashes, and underscores. Spaces are not allowed.'
  }
  return null
}

/* Returns an error string or null */
export function validateClassName (className, design) {
  if (!design) {
    throw new Error('A design is required')
  }
  const { classNamingConvention } = design
  if (classNamingConvention === 'snakeCase' && !SNAKE_CASE.test(className)) {
    return 'Name not valid snake_case'
  } else if (classNamingConvention === 'pascalCase' && !PASCAL_CASE.test(className)) {
    return 'Name not valid PascalCase'
  } else if (!LETTERS_NUMBERS_UNDERSCORE.test(className)) {
    return 'Class names can only have letters, numbers, and underscores'
  }
  return null
}

/* Returns an error string or null */
export function validatePropertyName (propertyName, design) {
  if (!design) {
    throw new Error('A design is required')
  }
  const { classNamingConvention } = design
  if (!propertyName) {
    return 'Property name is required'
  } else if (classNamingConvention === 'snakeCase' && !SNAKE_CASE.test(propertyName)) {
    return 'Property name not valid snake_case'
  } else if (classNamingConvention === 'camelCase' && !CAMEL_CASE.test(propertyName)) {
    return 'Property name not valid camelCase'
  } else if (!LETTERS_NUMBERS_UNDERSCORE.test(propertyName)) {
    return 'PropertyProperty names can only have letters, numbers, and underscores'
  }
  return null
}

export function validateUsername (userName) {
  if (!isString(userName)) {
    throw new Error('userName should be a string')
  }
  if (!LETTERS_NUMBERS_UNDERSCORE.test(userName)) {
    return 'Username can have letters, numbers, and underscores'
  }
  if (userName.length < 4) {
    return 'Username must be at least 4 characters'
  }
  return null
}

export function validateEmail (email) {
  if (!EMAIL.test(email)) {
    return 'Email address must contain an @ symbol'
  }
  return null
}

export function validatePassword (password) {
  if (!isString(password)) {
    throw new Error('userName should be a string')
  }
  if (password.length < 5) {
    return 'Password must be at least 5 characters'
  }
  return null
}
