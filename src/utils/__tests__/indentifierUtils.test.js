import { describe, it } from 'mocha'
import assert from 'assert'
// import { rangeTypes, properties, classes } from './testData/testSchema'
import { createIdentifier, reduceUid } from '../identifierUtils'

describe('identifierUtils', () => {
  describe('createIdentifier()', () => {
    it('should create a design uid', () => {
      const result = createIdentifier(
        'u',
        'user_name',
        'design_name'
      )
      assert.equal(result, '/u/user_name/design/design_name')
    })
    it('should lowercase a uid', () => {
      const result = createIdentifier(
        'u',
        'USER_NAME',
        'design_NAME'
      )
      assert.equal(result, '/u/user_name/design/design_name')
    })
    it('should create a design/version uid', () => {
      const result = createIdentifier(
        'u',
        'user_name',
        'design_name',
        '1.0.0'
      )
      assert.equal(result, '/u/user_name/design/design_name/version/1.0.0')
    })
    it('should create a design/version/class uid', () => {
      const result = createIdentifier(
        'u',
        'user_name',
        'design_name',
        '1.0.0',
        'class',
        'class_name'
      )
      assert.equal(result, '/u/user_name/design/design_name/version/1.0.0/class/class_name')
    })
    it('should create a design/version/class uid', () => {
      const result = createIdentifier(
        'u',
        'user_name',
        'design_name',
        '1.0.0',
        'property',
        'property_name'
      )
      assert.equal(result, '/u/user_name/design/design_name/version/1.0.0/property/property_name')
    })
  })
  describe('reduceUid()', () => {
    it('should create a design object', () => {
      const result = reduceUid('/u/user_name/design/design_name')
      assert.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name'
      })
    })
    it('should create a design/version object', () => {
      const result = reduceUid('/u/user_name/design/design_name/version/1.0.0')
      assert.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name',
        versionLabel: '1.0.0'
      })
    })
    it('should create a design/version/class object', () => {
      const result = reduceUid('/u/user_name/design/design_name/version/1.0.0/class/class_name')
      assert.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name',
        versionLabel: '1.0.0',
        resourceType: 'class',
        classOrProperty: 'class_name'
      })
    })
    it('should create a design/version/property object', () => {
      const result = reduceUid('/u/user_name/design/design_name/version/1.0.0/property/property_name')
      assert.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name',
        versionLabel: '1.0.0',
        resourceType: 'property',
        classOrProperty: 'property_name'
      })
    })
  })
})
