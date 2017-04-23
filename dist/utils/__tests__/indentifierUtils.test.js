'use strict';

var _mocha = require('mocha');

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _identifierUtils = require('../identifierUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('identifierUtils', function () {
  (0, _mocha.describe)('createIdentifier()', function () {
    (0, _mocha.it)('should create a design uid', function () {
      var result = (0, _identifierUtils.createIdentifier)('u', 'user_name', 'design_name');
      _assert2.default.equal(result, '/u/user_name/design/design_name');
    });
    (0, _mocha.it)('should lowercase a uid', function () {
      var result = (0, _identifierUtils.createIdentifier)('u', 'USER_NAME', 'design_NAME');
      _assert2.default.equal(result, '/u/user_name/design/design_name');
    });
    (0, _mocha.it)('should create a design/version uid', function () {
      var result = (0, _identifierUtils.createIdentifier)('u', 'user_name', 'design_name', '1.0.0');
      _assert2.default.equal(result, '/u/user_name/design/design_name/version/1.0.0');
    });
    (0, _mocha.it)('should create a design/version/class uid', function () {
      var result = (0, _identifierUtils.createIdentifier)('u', 'user_name', 'design_name', '1.0.0', 'class', 'class_name');
      _assert2.default.equal(result, '/u/user_name/design/design_name/version/1.0.0/class/class_name');
    });
    (0, _mocha.it)('should create a design/version/class uid', function () {
      var result = (0, _identifierUtils.createIdentifier)('u', 'user_name', 'design_name', '1.0.0', 'property', 'property_name');
      _assert2.default.equal(result, '/u/user_name/design/design_name/version/1.0.0/property/property_name');
    });
  });
  (0, _mocha.describe)('reduceUid()', function () {
    (0, _mocha.it)('should create a design object', function () {
      var result = (0, _identifierUtils.reduceUid)('/u/user_name/design/design_name');
      _assert2.default.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name'
      });
    });
    (0, _mocha.it)('should create a design/version object', function () {
      var result = (0, _identifierUtils.reduceUid)('/u/user_name/design/design_name/version/1.0.0');
      _assert2.default.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name',
        versionLabel: '1.0.0'
      });
    });
    (0, _mocha.it)('should create a design/version/class object', function () {
      var result = (0, _identifierUtils.reduceUid)('/u/user_name/design/design_name/version/1.0.0/class/class_name');
      _assert2.default.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name',
        versionLabel: '1.0.0',
        resourceType: 'class',
        classOrProperty: 'class_name'
      });
    });
    (0, _mocha.it)('should create a design/version/property object', function () {
      var result = (0, _identifierUtils.reduceUid)('/u/user_name/design/design_name/version/1.0.0/property/property_name');
      _assert2.default.deepEqual(result, {
        ownerType: 'u',
        userOrOrg: 'user_name',
        designName: 'design_name',
        versionLabel: '1.0.0',
        resourceType: 'property',
        classOrProperty: 'property_name'
      });
    });
  });
});
// import { rangeTypes, properties, classes } from './testData/testSchema'